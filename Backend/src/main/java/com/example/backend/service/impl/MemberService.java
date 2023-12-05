package com.example.backend.service.impl;

import com.example.backend.dto.ChangeNewPasswordRequest;
import com.example.backend.dto.EmailRequest;
import com.example.backend.dto.MemberRequestUpdate;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.Member;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.service.IEmailService;
import com.example.backend.service.IMemberService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.util.*;


@Service
@RequiredArgsConstructor
public class MemberService implements IMemberService {

    private final MemberRepository memberRepository;
    private  final AccountRepository accountRepository;
    private  final IEmailService iEmailService;
    private  final PasswordEncoder passwordEncoder;
    private final TemplateEngine templateEngine;

    @Override
    public Member createNew(Member member) throws MessagingException {

        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail(member.getEmail());
        emailRequest.setSubject("Đăng ký tài khoản thành công!");
        Context context = new Context();
        // Process the template and get the HTML content
        String htmlContent = templateEngine.process("welcomeMail", context);
        emailRequest.setContent(htmlContent);

        iEmailService.sendMail(emailRequest);
        return memberRepository.save(member);
    }

    @Override
    public Member update(Member member, Long id) throws MessagingException {
        return memberRepository.findById(id).map( mem -> {
            mem.setEmail(member.getEmail());
            mem.setStatus(member.getStatus());
            mem.setPhoneNumber(member.getPhoneNumber());
            mem.setAccumulatePoints(member.getAccumulatePoints());
            return memberRepository.save(mem);
        }).orElseThrow(() -> new NotFoundException("Sorry, ths member could not be found"));
    }

    @Override
    public Member updateMember(MemberRequestUpdate memberRequestUpdate, Long id) throws MessagingException {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Member not found!"));

        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail(member.getEmail());
        emailRequest.setSubject("Thay đổi thông tin tài khoản thành công!");
        Context context = new Context();
        String htmlContent = templateEngine.process("updateInfoSuccess", context);
        emailRequest.setContent(htmlContent);
        iEmailService.sendMail(emailRequest);

        Account account = member.getAccount();
        account.setUsername(memberRequestUpdate.getUsername());

        member.setPhoneNumber(memberRequestUpdate.getPhoneNumber());
        member.setEmail(memberRequestUpdate.getEmail());

        account = accountRepository.save(account);
        member.setAccount(account);

        return memberRepository.save(member);
    }


    @Override
    public List<Member> getAllAccountNotDelete(Integer page,Integer size, Boolean status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "email"));
        return memberRepository.findAllByIsDeleteFalseAndStatus(pageable,status);
    }

    @Override
    public List<Member> getAllAccount(Integer page, Integer size, Boolean status, Boolean isDelete) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "email"));
        if( isDelete ) {
            return memberRepository.findAllByIsDeleteTrueAndStatus(pageable,status);
        }else {
            return memberRepository.findAllByIsDeleteFalseAndStatus(pageable,status);
        }
    }

    @Override
    public Member getMember(Long id) {
        return memberRepository.findById(id).orElseThrow( () -> new NotFoundException("Member is not found")) ;
    }

    @Override
    public Member deleteSoftMember(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        if( member.isPresent() ) {
            Optional<Account> account = accountRepository.findById(member.get().getAccount().getId());
            if( account.isPresent()) {
                accountRepository.save(account.get());
                member.get().setAccount(account.get());
                member.get().setIsDelete(true);
                memberRepository.save(member.get());
                return member.get();
            }else {
                throw new NotFoundException("Member is not found!");
            }
        }else {
            throw new NotFoundException("Member is not found!");
        }
    }

    @Override
    public Member blockMember(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        if( member.isPresent() ) {
            Optional<Account> account = accountRepository.findById(member.get().getAccount().getId());
            if( account.isPresent()) {
                accountRepository.save(account.get());
                member.get().setAccount(account.get());
                member.get().setStatus(false);
                memberRepository.save(member.get());
                return member.get();
            }else {
                throw new NotFoundException("Member is not found!");
            }
        }else {
            throw new NotFoundException("Member is not found!");
        }
    }

    @Override
    public Member unLockMember(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        if( member.isPresent() ) {
            Optional<Account> account = accountRepository.findById(member.get().getAccount().getId());
            if( account.isPresent()) {
                accountRepository.save(account.get());
                member.get().setAccount(account.get());
                member.get().setStatus(true);
                memberRepository.save(member.get());
                return member.get();
            }else {
                throw new NotFoundException("Member is not found!");
            }
        }else {
            throw new NotFoundException("Member is not found!");
        }
    }

    @Override
    public void deleteMember(Long id) {

    }

    @Override
    public Member updateAccumulatePoints(double accumulatePoints, Long id) {
        return memberRepository.findById(id).map( mem -> {
            mem.setAccumulatePoints(accumulatePoints);
            return memberRepository.save(mem);
        }).orElseThrow(() -> new NotFoundException("Sorry, ths member could not be found"));
    }

    @Override
    public List<Member> search(String key, Integer page,Integer size, Boolean status, Boolean isDelete) {
        Pageable pageableMember = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "email"));
        return  memberRepository.searchMembers( key, status,isDelete, pageableMember);
    }

    @Override
    public Member changePassword(ChangeNewPasswordRequest changeNewPasswordRequest, Long mId) throws MessagingException {
        if( !changeNewPasswordRequest.getPassword().equals(changeNewPasswordRequest.getConfirmPassword())) {
            throw new RuntimeException("Confirm password does not match!");
        }

        Optional<Member> memberOptional = memberRepository.findById(mId);

        if( memberOptional.isEmpty() ) throw  new NotFoundException("Member not found!");

        Member member = memberOptional.get();

        Account account = member.getAccount();
        account.setPassword(passwordEncoder.encode(changeNewPasswordRequest.getPassword()));

        accountRepository.save(account);

        Boolean isSendmail = iEmailService.sendMailChangePasswordSuccessfully(member.getEmail(), account.getUsername());



        return isSendmail ? member : null;
    }
}
