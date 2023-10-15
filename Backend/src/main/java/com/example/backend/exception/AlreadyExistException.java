package com.example.backend.exception;

public class AlreadyExistException extends RuntimeException {
    public AlreadyExistException(String s) {
        super(s);
    }
}
