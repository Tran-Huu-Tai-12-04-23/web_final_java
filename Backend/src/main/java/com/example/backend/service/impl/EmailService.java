package com.example.backend.service.impl;

import com.example.backend.dto.EmailRequest;
import com.example.backend.service.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    @Override
    public Boolean sendMail(EmailRequest emailRequest) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(emailRequest.getEmail());
        helper.setSubject(emailRequest.getSubject());
        helper.setText(emailRequest.getContent(),true);
        try {
            javaMailSender.send(message);
            return true;
        } catch (MailException e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Boolean sendMailChangePasswordSuccessfully(String email, String username) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        helper.setTo(email);
        helper.setSubject("Bạn đã thay đổi mật khẩu thành công!");
        Context context = new Context();
        context.setVariable("username", username);

        // Process the template and get the HTML content
        String htmlContent = templateEngine.process("change-pass-notification", context);
        helper.setText(htmlContent,true);
        try {
            javaMailSender.send(message);
            return true;
        } catch (MailException e) {
            e.printStackTrace();
            return false;
        }

    }
}
