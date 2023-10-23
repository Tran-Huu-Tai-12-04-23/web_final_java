package com.example.backend.service.impl;

import com.example.backend.exception.AlreadyExistException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.Member;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.service.IAccountService;
import com.example.backend.service.IMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.naming.Name;
import javax.security.auth.login.AccountNotFoundException;
import java.util.*;

import static com.example.backend.utils.AppConstants.CREATED_AT;

@Service
@RequiredArgsConstructor
public class MemberService implements IMemberService {

    private final MemberRepository memberRepository;
    private  final AccountRepository accountRepository;

    @Override
    public Member createNew(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public Member update(Member member, Long id) {
        return memberRepository.findById(id).map( mem -> {
            mem.setEmail(member.getEmail());
            mem.setPhoneNumber(member.getPhoneNumber());
            mem.setAccumulatePoints(member.getAccumulatePoints());
            return memberRepository.save(mem);
        }).orElseThrow(() -> new NotFoundException("Sorry, ths member could not be found"));
    }

    @Override
    public List<Member> getAllAccount(Integer page,Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "email"));
        return memberRepository.findAll(pageable).toList();
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
                account.get().setIsDelete(true);
                accountRepository.save(account.get());
                member.get().setAccount(account.get());
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
    public List<Member> search(String key, Integer page,Integer size) {
        Pageable pageableMember = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "email"));
        Pageable pageableAccount = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "username"));
        List<Account> listAccount = accountRepository.findByUsernameContaining(key, pageableAccount);
        List<Member> listMember = new ArrayList<>();

        for (Account acc : listAccount) {
            Optional<Member> mem = Optional.ofNullable(memberRepository.findByAccount(acc));
            mem.ifPresent(listMember::add);
        }
        if(listMember.size() < size) {
            List<Member> listMemberByEmail = memberRepository.findByEmailContaining(key,pageableMember);
            for( Member mem : listMemberByEmail) {
                if( !listMember.contains(mem) && listMember.size() < size) {
                    listMember.add(mem);
                }
            }
        }

        return listMember;
    }
}
