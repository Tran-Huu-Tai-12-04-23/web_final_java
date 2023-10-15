package com.example.backend.controller;


import com.example.backend.model.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class MemberController {
    @GetMapping
    public ResponseEntity<String> getStudents() {
        String message = "Hello member";
        return ResponseEntity.ok(message);
    }

}
