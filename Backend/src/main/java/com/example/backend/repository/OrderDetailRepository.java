package com.example.backend.repository;

import com.example.backend.model.OrderDetail;
import com.example.backend.model.OrderMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

}
