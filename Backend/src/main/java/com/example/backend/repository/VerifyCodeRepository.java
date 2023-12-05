package com.example.backend.repository;

import com.example.backend.model.Question;
import com.example.backend.model.VerifyCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface VerifyCodeRepository extends JpaRepository<VerifyCode, Long> {
    List<VerifyCode> findAllByCreateAtAfter(Date time);
    VerifyCode findByAccount_IdAndCode(Long accountId, String code);
}
