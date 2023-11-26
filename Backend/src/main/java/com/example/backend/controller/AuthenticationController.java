package com.example.backend.controller;


import com.example.backend.dto.*;
import com.example.backend.model.Account;
import com.example.backend.model.Member;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.IAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpMemberRequest signUpMemberRequest) {
        try {
            Member member = authenticationService.signUp(signUpMemberRequest);
            return ResponseEntity.ok(member);
        } catch (ResponseStatusException e) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setMessage(e.getReason());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody Account account) {
        JWTAuthenticationResponse jwtAuthenticationResponse = authenticationService.signIn(account);

        if(jwtAuthenticationResponse == null) {
            return ResponseEntity.badRequest().body("Invalid username or password!");
        }
        Member member = authenticationService.getMember(account.getUsername());

        if( member == null) {
            Account acc = authenticationService.getAccount(account.getUsername());
            SignInResponse<Account> signInResponse = new SignInResponse<Account>( acc, jwtAuthenticationResponse);
            return ResponseEntity.ok(signInResponse);
        }else {
            if(!member.getStatus()) {
                ErrorResponse errorResponse = new ErrorResponse();
                errorResponse.setMessage("User blocked!");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            SignInResponse<Member> signInResponse = new SignInResponse<Member>(member, jwtAuthenticationResponse);
            return ResponseEntity.ok(signInResponse);
        }

    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JWTAuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        System.out.println(refreshTokenRequest.getToken());
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

}
