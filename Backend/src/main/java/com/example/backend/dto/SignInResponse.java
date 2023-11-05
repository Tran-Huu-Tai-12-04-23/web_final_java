package com.example.backend.dto;

import com.example.backend.model.Account;
import com.example.backend.model.Member;

public class SignInResponse {
    private JWTAuthenticationResponse jwtAuthenticationResponse;
    private Member member;

    public JWTAuthenticationResponse getJwtAuthenticationResponse() {
        return jwtAuthenticationResponse;
    }

    public void setJwtAuthenticationResponse(JWTAuthenticationResponse jwtAuthenticationResponse) {
        this.jwtAuthenticationResponse = jwtAuthenticationResponse;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public SignInResponse(Member member, JWTAuthenticationResponse jwtAuthenticationResponse) {
        this.member = member;
        this.jwtAuthenticationResponse = jwtAuthenticationResponse;
    }
}
