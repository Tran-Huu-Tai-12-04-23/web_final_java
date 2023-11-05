package com.example.backend.controller;


import com.example.backend.dto.*;
import com.example.backend.model.Account;
import com.example.backend.model.Member;
import com.example.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

        Member member = authenticationService.getMember(account.getUsername());
        System.out.println(member.getEmail());

        if( member == null) return ResponseEntity.badRequest().body("Member not found");

        SignInResponse signInResponse = new SignInResponse(member, jwtAuthenticationResponse);
        return ResponseEntity.ok(signInResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JWTAuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

}
