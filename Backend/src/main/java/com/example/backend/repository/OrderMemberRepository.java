package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.OrderMember;
import com.example.backend.model.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderMemberRepository extends JpaRepository<OrderMember, Long> {
    List<OrderMember> findByMember_Id(Long mId);

}
