package com.example.backend.controller;


import com.example.backend.dto.ErrorResponse;
import com.example.backend.dto.JWTAuthenticationResponse;
import com.example.backend.dto.RefreshTokenRequest;
import com.example.backend.dto.SignUpMemberRequest;
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
    public ResponseEntity<JWTAuthenticationResponse> signIn(@RequestBody Account account) {
        return ResponseEntity.ok(authenticationService.signIn(account));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JWTAuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

}
