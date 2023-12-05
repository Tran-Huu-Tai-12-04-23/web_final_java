package com.example.backend.controller.user;

import com.example.backend.dto.ChangeNewPasswordRequest;
import com.example.backend.dto.EmailRequest;
import com.example.backend.dto.UserChangePasswordRequest;
import com.example.backend.model.*;
import com.example.backend.service.IUserVerityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user/verify")
@RequiredArgsConstructor
public class VerifyController {
    private final IUserVerityService iUserVerityService;

    @PostMapping("/verify-change-pass")
    public ResponseEntity<?> verifyChangePassword(@RequestBody UserChangePasswordRequest userChangePasswordRequest) {
        try {

            VerifyCode verifyCode = iUserVerityService.createVerifyForChangePassword(userChangePasswordRequest);

            if(verifyCode == null) {
                return ResponseEntity.badRequest().body("Failed to send email.");
            }else {
                return ResponseEntity.ok("Send code successfully!, Please check eamil!");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/send-code")
    public ResponseEntity<?> sendCode(@RequestBody EmailRequest emailRequest) {
        try {

            VerifyCode verifyCode = iUserVerityService.createVerifyCodeAndSendIt(emailRequest);

            if(verifyCode == null) {
                return ResponseEntity.badRequest().body("Failed to send email.");
            }else {
                return ResponseEntity.ok("Send code successfully!, Please check eamil!");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/verify-code/{accountId}")
    public ResponseEntity<?> verifyCode(@PathVariable Long accountId, @RequestParam String code) {
        try {

            Boolean isVerify = iUserVerityService.verifyCode(accountId, code);

            if(isVerify) {
                return ResponseEntity.badRequest().body("Verify successfully!");
            }else {
                return ResponseEntity.ok("Invalid code! Please try again!");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
