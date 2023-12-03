package com.example.backend.model;


import lombok.Getter;

@Getter
public class MomoResponseRequest {
    private String partnerCode;
    private String accessKey;
    private String orderId;
    private String localMessage;
    private String message;
    private String transId;
    private String orderInfo;
    private String amount;
    private String errorCode;
    private String responseTime;
    private String requestId;
    private String extraData;
    private String payType;
    private String orderType;
    private String m2signature;

    // Getters and setters
}