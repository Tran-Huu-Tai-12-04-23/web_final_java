package com.example.backend.service.impl;

import com.example.backend.dto.EmailRequest;
import com.example.backend.dto.UserChangePasswordRequest;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.example.backend.service.IEmailService;
import com.example.backend.service.IUserVerityService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static com.example.backend.utils.Utils.generateRandomCode;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class VerifyCodeService implements IUserVerityService {
    private final VerifyCodeRepository verifyCodeRepository;
    private final IEmailService iEmailService;
    private final TemplateEngine templateEngine;
    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final AuthenticationManager authenticationManager;

    @Override
    public Boolean verifyCode(Long accountId, String code) {
        VerifyCode verifyCode = verifyCodeRepository.findByAccount_IdAndCode(accountId, code);
        boolean isCheck =  verifyCode != null;
        if( isCheck ) {
            verifyCodeRepository.delete(verifyCode);

        }
        return isCheck;
    }


    @Scheduled(fixedRate = 60000)
    public void removeExpiredVerifyCodesScheduled() {
        Date now = new Date();
        Date creationTime = new Date(now.getTime() - (60 * 1000));

        List<VerifyCode> recentVerifyCodes = verifyCodeRepository.findAllByCreateAtAfter(creationTime);


        // Remove the expired VerifyCodes using iterator
        Iterator<VerifyCode> iterator = recentVerifyCodes.iterator();
        while (iterator.hasNext()) {
            VerifyCode verifyCode = iterator.next();
            verifyCodeRepository.delete(verifyCode);
            System.out.println(verifyCode.getCode());
        }
    }

    @Override
    public VerifyCode createVerifyCodeAndSendIt(EmailRequest emailRequest) {
        String code = generateRandomCode(6);

        Optional<Account> accountOp = accountRepository.findById(emailRequest.getAccountId());

        if( accountOp.isEmpty() ) throw new NotFoundException("Account not found");
        Member memberOp = memberRepository.findByAccount(accountOp.get());
        if( memberOp == null) throw new NotFoundException("Member not found!");
        emailRequest.setEmail(memberOp.getEmail());

        Context context = new Context();
        context.setVariable("username", accountOp.get().getUsername());
        context.setVariable("code", code);

        // Process the template and get the HTML content
        String htmlContent = templateEngine.process("mail-code-verify", context);

        emailRequest.setContent(htmlContent);

        try {
            Boolean isSendMail = iEmailService.sendMail(emailRequest);

            if( isSendMail) {
                VerifyCode verifyC = new VerifyCode();
                verifyC.setAccount(accountOp.get());
                verifyC.setCode(code);
                verifyC.setCreateAt(new Date());

                return verifyCodeRepository.save(verifyC);
            }
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return null;

    }

    @Override
    public VerifyCode createVerifyForChangePassword(UserChangePasswordRequest userChangePasswordRequest) {
        Optional<Account> accountOptional = accountRepository.findById(userChangePasswordRequest.getAccountId());

        if( accountOptional.isEmpty())throw new NotFoundException("Account not found!");

        Account account = accountOptional.get();

        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(account.getUsername(), userChangePasswordRequest.getPassword()));

        if (authenticate.isAuthenticated()) {
            EmailRequest emailRequest = new EmailRequest();
            emailRequest.setSubject("Verify code to change password!");
            emailRequest.setAccountId(account.getId());

            return this.createVerifyCodeAndSendIt(emailRequest);

        } else {
            throw new RuntimeException("Invalid password!");
        }

    }
}
