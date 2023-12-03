package com.example.backend.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MomoResponse {
    private String message;
    private boolean success;
    private DebugInfo debugger;

    // Constructor, getters, and setters
}

