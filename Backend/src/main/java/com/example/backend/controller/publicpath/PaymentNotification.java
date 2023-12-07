package com.example.backend.controller.publicpath;

import com.example.backend.config.ConfigVnPay;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.OrderMember;
import com.example.backend.service.IUserOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/payment/notification")
@RequiredArgsConstructor
public class PaymentNotification {
    private final TemplateEngine templateEngine;
    private final IUserOrderService iUserOrderService;
    @GetMapping("/check")
    public ResponseEntity<?> handlePaymentNotification(@RequestParam Map<String, String> params) {
        try {

//            String vnpAmount = params.get("vnp_Amount");
//            String vnpBankCode = params.get("vnp_BankCode");
//            String vnpBankTranNo = params.get("vnp_BankTranNo");
//            String vnp_PayDate = params.get("vnp_PayDate");
            String vnp_OrderInfo = params.get("vnp_OrderInfo");
            String vnp_ResponseCode = params.get("vnp_ResponseCode");
            String vnp_TransactionStatus = params.get("vnp_TransactionStatus");

            System.out.println(vnp_ResponseCode);
            System.out.println(vnp_TransactionStatus);

            if( vnp_ResponseCode.equals(vnp_TransactionStatus) && vnp_ResponseCode.equals("00")) {
                OrderMember orderMember = iUserOrderService.changePaymentStatus(Long.valueOf(vnp_OrderInfo));

                if( orderMember == null ) {
                    throw  new RuntimeException("Payment failed!");
                }
                Context context = new Context();
                context.setVariable("orderId", orderMember.getId());
                String htmlContent = templateEngine.process("orderComplete", context);

                return ResponseEntity.ok(htmlContent);
            }else {
                return ResponseEntity.ok("Payment failed!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Payment failed");
        }
    }
}
