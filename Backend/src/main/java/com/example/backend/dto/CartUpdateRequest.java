package com.example.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartUpdateRequest {
    private Long cartItemId;
    private Integer quantity;
}
