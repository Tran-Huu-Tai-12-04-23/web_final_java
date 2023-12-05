package com.example.backend.service;

import com.example.backend.dto.JWTAuthenticationResponse;
import com.example.backend.dto.RefreshTokenRequest;
import com.example.backend.dto.SignUpMemberRequest;
import com.example.backend.model.Account;
import com.example.backend.model.Member;
import jakarta.mail.MessagingException;

import javax.accessibility.AccessibleContext;

public interface AuthenticationService {
    Member signUp(SignUpMemberRequest signUpMemberRequest) throws MessagingException;

    JWTAuthenticationResponse signIn(Account account);

    JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

    Member getMember(String username);
    Account getAccount(String username);
}
