package com.example.backend.controller.user;

import com.example.backend.dto.ChangeNewPasswordRequest;
import com.example.backend.dto.ErrorResponse;
import com.example.backend.dto.MemberRequestUpdate;
import com.example.backend.dto.UserChangePasswordRequest;
import com.example.backend.model.Member;
import com.example.backend.service.IMemberService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/member")
@RequiredArgsConstructor
public class UserMemberController {

    private final IMemberService iMemberService;
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(@RequestBody MemberRequestUpdate memberRequestUpdate, @PathVariable Long id) {
        try{
            return ResponseEntity.ok(iMemberService.updateMember(memberRequestUpdate, id));
        }catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(err.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @GetMapping(value = "/detail-member/{mId}")
    public ResponseEntity<?> getMember(@PathVariable Long mId) {
        try {
            Member member = iMemberService.getMember(mId);
            if (member != null) {
                return ResponseEntity.ok(member);
            } else {
                String errorMessage = "User with ID " + mId + " not found.";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
            }
        } catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @PutMapping(value = "/change-password/{mId}")
    public ResponseEntity<?> changePassword(@RequestBody ChangeNewPasswordRequest changeNewPasswordRequest, @PathVariable Long mId) {
        try {
            Member member = iMemberService.changePassword(changeNewPasswordRequest, mId);
            if (member != null) {
                return ResponseEntity.ok(member);
            } else {

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Change password failed!");
            }
        } catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
}
