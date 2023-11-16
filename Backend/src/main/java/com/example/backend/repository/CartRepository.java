package com.example.backend.repository;

import com.example.backend.model.Cart;
import com.example.backend.model.Member;
import com.example.backend.model.Question;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByMember(Member member);
}
