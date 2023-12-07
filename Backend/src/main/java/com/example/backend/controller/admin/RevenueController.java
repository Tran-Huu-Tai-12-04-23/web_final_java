package com.example.backend.controller.admin;

import com.example.backend.controller.user.UserOrderController;
import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Blog;
import com.example.backend.model.OrderMember;
import com.example.backend.service.IBlogService;
import com.example.backend.service.IUserOrderService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/revenue")
@RequiredArgsConstructor
public class RevenueController {
    private final IUserOrderService iUserOrderService;

    @GetMapping("/total-order")
    public ResponseEntity<?> countRevenue( ){
        try{
            Double revenue = iUserOrderService.calculatorRevenue();
            return ResponseEntity.ok(revenue);
        }catch(Exception e){
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
}
