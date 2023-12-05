package com.example.backend.repository;

import com.example.backend.model.OrderDetail;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
=======
import com.example.backend.model.OrderMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

>>>>>>> main
}
