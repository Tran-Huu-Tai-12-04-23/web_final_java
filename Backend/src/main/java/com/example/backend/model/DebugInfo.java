package com.example.backend.model;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DebugInfo {
    private String rawData;
    private String momoSignature;
    private String partnerSignature;

}