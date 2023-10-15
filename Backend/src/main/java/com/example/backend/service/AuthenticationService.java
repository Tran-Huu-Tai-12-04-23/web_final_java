package com.example.backend.service;

import com.example.backend.dto.JWTAuthenticationResponse;
import com.example.backend.dto.RefreshTokenRequest;
import com.example.backend.dto.SignUpMemberRequest;
import com.example.backend.model.Account;
import com.example.backend.model.Member;

public interface AuthenticationService {
    Member signUp(SignUpMemberRequest signUpMemberRequest);

    JWTAuthenticationResponse signIn(Account account);

    JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
