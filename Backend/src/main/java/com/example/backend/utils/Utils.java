package com.example.backend.utils;
import com.example.backend.exception.MainException;
import com.example.backend.model.Product;
import org.springframework.http.HttpStatus;

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

}
