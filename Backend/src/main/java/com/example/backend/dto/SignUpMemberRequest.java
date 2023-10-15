package com.example.backend.dto;


import lombok.Data;

@Data
public class SignUpMemberRequest {
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String confirmPassword;
}
