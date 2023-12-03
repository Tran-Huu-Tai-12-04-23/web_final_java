package com.example.backend.service;

import com.example.backend.dto.EmailRequest;
import jakarta.mail.MessagingException;

public interface IEmailService {
    Boolean sendMail(EmailRequest emailRequest) throws MessagingException;
    Boolean sendMailChangePasswordSuccessfully(String email, String username) throws MessagingException;
}
