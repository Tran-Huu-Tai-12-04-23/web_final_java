package com.example.backend.utils;
import com.example.backend.dto.OrderRequest;
import com.example.backend.dto.QuestionRequest;
import com.example.backend.exception.MainException;
import com.example.backend.model.Product;
import org.springframework.http.HttpStatus;

import java.util.Objects;

public class Utils {
    public static boolean isPhoneNumberValid(String phoneNumber) {
        String regex = "^(\\+\\d{1,3}[- ]?)?\\d{10}$";
        return phoneNumber.matches(regex);
    }

    public static boolean isEmailValid(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(regex);
    }



    public static void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Page number cannot be less than zero.");
        }

        if (size < 0) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Size number cannot be less than zero.");
        }

        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public static void validateOrderRequest(OrderRequest orderRequest) {
        if (orderRequest == null) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Order request cannot be null.");
        }

        // Check if the member and member ID are present
        if (orderRequest.getMember() == null || orderRequest.getMember().getId() == null) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Member ID is required in the order request.");
        }

        // Check if the total amount is valid
        if (orderRequest.getTotal() <= 0.0) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Total amount must be greater than zero.");
        }

        // Check if the order amount is valid
        if (orderRequest.getAmount() <= 0) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Order amount must be greater than zero.");
        }

        // Check if there is at least one product in the order
        if (orderRequest.getProducts() == null || orderRequest.getProducts().isEmpty()) {
            throw new MainException(HttpStatus.BAD_REQUEST, "At least one product is required in the order request.");
        }

        for (Product product : orderRequest.getProducts()) {
            if (product.getPrice() == null || product.getPrice() <= 0) {
                throw new MainException(HttpStatus.BAD_REQUEST, "Invalid price for one or more products.");
            }
        }

    }
    public static void validateQuestionRequest(QuestionRequest questionRequest){
        if (questionRequest == null){
            throw new MainException(HttpStatus.BAD_REQUEST, "Question request cannot be null.");
        }
        // Check if the member and member ID are present
        if (questionRequest.getMember() == null || questionRequest.getMember().getId() == null) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Member ID is required in the question request.");
        }
        //check question content
        if (questionRequest.getContent().isEmpty()){
            throw new MainException(HttpStatus.BAD_REQUEST, "Content is required in the question request.");
        }
        if (questionRequest.getProduct() == null || questionRequest.getProduct().getId() == null){
            throw new MainException(HttpStatus.BAD_REQUEST, "Product is required in the question request.");
        }
    }
}
