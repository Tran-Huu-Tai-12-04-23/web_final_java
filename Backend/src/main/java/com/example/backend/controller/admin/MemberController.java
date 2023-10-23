package com.example.backend.controller.admin;

import com.example.backend.dto.ErrorResponse;
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
@RequestMapping("/api/v1/admin/member")
@RequiredArgsConstructor
public class MemberController {

    private final IMemberService iMemberService;

    @GetMapping("/all")
    public ResponseEntity<List<Member>> getAllMember(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        Utils.validatePageNumberAndSize(page, size);
        return ResponseEntity.ok(iMemberService.getAllAccount(page, size));
    }

    @PutMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        return ResponseEntity.ok(iMemberService.update(member, member.getId()));
    }

    @DeleteMapping("/delete-soft")
    public ResponseEntity<?> DeleteSoft(@RequestParam Long id) {
        try{
            return ResponseEntity.ok(iMemberService.deleteSoftMember(id));
        }catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(err.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }

    }
    @GetMapping("/search")
    public ResponseEntity<?> searchMember(
            @RequestParam String key,
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try{
            Utils.validatePageNumberAndSize(page, size);
            List<Member> listMemberRes = iMemberService.search(key, page, size);
            if(listMemberRes.isEmpty()) {
                ErrorResponse err = new ErrorResponse();
                err.setMessage("Can't find member with " + key);
                return  ResponseEntity.status(HttpStatus.BAD_REQUEST ).body(err);
            }else {
                return ResponseEntity.ok(listMemberRes);
            }
        }catch (Exception e ) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR ).body(err);
        }
    }

    @GetMapping(value = "/detail-member")
    public ResponseEntity<?> getMember(@RequestBody Long id) {
        try {
            Member member = iMemberService.getMember(id);
            if (member != null) {
                return ResponseEntity.ok(member);
            } else {
                String errorMessage = "User with ID " + id + " not found.";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
}
