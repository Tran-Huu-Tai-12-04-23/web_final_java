package com.example.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberRequestUpdate {
    private String username;
    private String phoneNumber;
    private String email;
}
