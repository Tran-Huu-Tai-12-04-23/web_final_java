package com.example.backend.dto;


import com.example.backend.model.Address;
import com.example.backend.model.Member;
import com.example.backend.model.MethodPayment;
import com.example.backend.model.Product;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class OrderRequest {
    private List<Product> products;
    private Member member;
    private double total;
    private int amount;
    private Address address;
    private int methodPayment;
}
