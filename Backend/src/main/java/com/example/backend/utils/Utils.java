package com.example.backend.utils;

public class Utils {
    public static boolean isPhoneNumberValid(String phoneNumber) {
        String regex = "^(\\+\\d{1,3}[- ]?)?\\d{10}$";
        return phoneNumber.matches(regex);
    }

    public static boolean isEmailValid(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(regex);
    }

}
