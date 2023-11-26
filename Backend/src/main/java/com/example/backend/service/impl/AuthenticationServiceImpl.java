package com.example.backend.service.impl;

import com.example.backend.dto.JWTAuthenticationResponse;
import com.example.backend.dto.RefreshTokenRequest;
import com.example.backend.dto.SignUpMemberRequest;
import com.example.backend.exception.AlreadyExistException;
import com.example.backend.model.Account;
import com.example.backend.model.Member;
import com.example.backend.model.Role;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.JWTService;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    private final String USER_EMPTY = "Please enter username";
    private final String PASSWORD_EMPTY = "Please enter password";
    private final String CONFIRM_PASSWORD_EMPTY = "Please enter confirm password";
    private final String EMAIL_EMPTY = "Please enter email";
    private final String PHONE_NUMBER_EMPTY = "Please enter phone number";
    private final String EMAIL_INVALID = "Email invalid";
    private final String PHONE_NUMBER_INVALID = "Phone number invalid invalid";
    private final String PASSWORD_CONFIRM_NOT_MATCH = "Password and confirm password does not match!";
    private final String PHONE_EXIST = "Phone number in use!";
    private final String EMAIL_EXIST = "Email in use!";


    public Member signUp(SignUpMemberRequest signUpMemberRequest) throws ResponseStatusException{

        boolean checkAccountExist = accountRepository.existsByUsername(signUpMemberRequest.getUsername());

        if( checkAccountExist ) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Account already exists");
        }

        boolean checkEmailExist = memberRepository.existsByEmail(signUpMemberRequest.getEmail());
        if(checkEmailExist) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, EMAIL_EXIST);
        }
        boolean checkPhoneExist = memberRepository.existsByPhoneNumber(signUpMemberRequest.getPhoneNumber());
        if(checkPhoneExist) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, PHONE_EXIST);
        }
        String checkDataInputMessage = checkRequestDataInput(signUpMemberRequest);

        if( !checkDataInputMessage.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, checkDataInputMessage);
        }

        Account newAccount = new Account();
        newAccount.setUsername(signUpMemberRequest.getUsername());
        newAccount.setRole(Role.USER);
        newAccount.setPassword(passwordEncoder.encode(signUpMemberRequest.getPassword()));
        Account accountSave = accountRepository.save(newAccount);
        Member newMember = new Member();
        newMember.setAccount(accountSave);
        newMember.setEmail(signUpMemberRequest.getEmail());
        newMember.setAccumulatePoints(Double.valueOf(0));
        newMember.setPhoneNumber(signUpMemberRequest.getPhoneNumber());

        return memberRepository.save(newMember);
    }

    private String checkRequestDataInput(SignUpMemberRequest signUpMemberRequest) {

        if(signUpMemberRequest.getUsername() == null || signUpMemberRequest.getUsername().isEmpty() ) {
            return USER_EMPTY;
        }

        if(signUpMemberRequest.getPassword() == null|| signUpMemberRequest.getPassword().isEmpty()) return PASSWORD_EMPTY;

        if( signUpMemberRequest.getConfirmPassword() == null || signUpMemberRequest.getConfirmPassword().isEmpty()) return CONFIRM_PASSWORD_EMPTY;

        if(signUpMemberRequest.getEmail() == null || signUpMemberRequest.getEmail().isEmpty()) return EMAIL_EMPTY;

        if( signUpMemberRequest.getPhoneNumber() == null || signUpMemberRequest.getPhoneNumber().isEmpty()) return PHONE_NUMBER_EMPTY;

        if( !signUpMemberRequest.getPassword().equals(signUpMemberRequest.getConfirmPassword())) return PASSWORD_CONFIRM_NOT_MATCH;

        if(!Utils.isEmailValid(signUpMemberRequest.getEmail())) return EMAIL_INVALID;

        if( !Utils.isPhoneNumberValid(signUpMemberRequest.getPhoneNumber())) return PHONE_NUMBER_INVALID;

        return "";
    }
    public JWTAuthenticationResponse signIn(Account account) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(account.getUsername(), account.getPassword()));

        var acc = accountRepository.findByUsername(account.getUsername()).orElseThrow(() -> new IllegalAccessError("Invalid user name or password"));
        var jwtToken = jwtService.generateToken(acc);
        var jwtRefreshToken = jwtService.generateRefreshToken(new HashMap<>() , acc);

        JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwtToken);
        jwtAuthenticationResponse.setRefreshToken(jwtRefreshToken);

        return jwtAuthenticationResponse;
    }

    public JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String username = jwtService.extractUsername(refreshTokenRequest.getToken());
        Account acc = accountRepository.findByUsername(username).orElseThrow();

        if( jwtService.isTokenValid(refreshTokenRequest.getToken(), acc)) {
            var jwtToken = jwtService.generateToken(acc);

            JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwtToken);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());

            return jwtAuthenticationResponse;

        }

        return null;
    }

    @Override
    public Member getMember(String username) {
       Account account =  accountRepository.findByUsername(username).orElseThrow(() -> new IllegalAccessError("Account not found"));
        if( account == null) return null;

        return memberRepository.findByAccount(account);
    }

    @Override
    public Account getAccount(String username) {
        return accountRepository.findByUsername(username).orElseThrow(() -> new IllegalAccessError("Account not found"));
    }
}
