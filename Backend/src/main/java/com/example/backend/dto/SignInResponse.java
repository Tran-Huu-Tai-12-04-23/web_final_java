package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.Member;
import lombok.Getter;

@Getter
public class SignInResponse<T> {
    private JWTAuthenticationResponse jwtAuthenticationResponse;
    private T data;

    public void setJwtAuthenticationResponse(JWTAuthenticationResponse jwtAuthenticationResponse) {
        this.jwtAuthenticationResponse = jwtAuthenticationResponse;
    }

    public void setData(T data) {
        this.data = data;
    }

    public SignInResponse(T data, JWTAuthenticationResponse jwtAuthenticationResponse) {
        this.data = data;
        this.jwtAuthenticationResponse = jwtAuthenticationResponse;
    }
}
