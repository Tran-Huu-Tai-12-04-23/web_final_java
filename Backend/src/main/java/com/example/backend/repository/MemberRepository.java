package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByAccount(Account account);

    List<Member> findByEmailContaining(String email, Pageable pageable);
}
