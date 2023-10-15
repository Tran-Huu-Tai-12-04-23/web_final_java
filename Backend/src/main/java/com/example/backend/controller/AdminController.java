package com.example.backend.controller;

import com.example.backend.model.Account;
import com.example.backend.service.IAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final IAccountService iAccountService;
    @GetMapping("/get-users")
    public ResponseEntity<List<Account>> getStudents() {
        System.out.println("RUn get users");
        return new ResponseEntity<>(iAccountService.getAllAccount(), HttpStatus.FOUND);
    }
}
