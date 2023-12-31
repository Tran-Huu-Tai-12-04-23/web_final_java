package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.OrderMember;
import com.example.backend.model.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderMemberRepository extends JpaRepository<OrderMember, Long> {
    List<OrderMember> findByMember_IdOrderByOrderDateDesc(Long mId);

    @Query("SELECT o FROM OrderMember o " +
            "WHERE (:key IS NULL OR o.fullName LIKE %:key% OR o.phoneNumberTakeOrder LIKE %:key%) " +
            "AND (:stepOrder IS NULL OR o.stepOrder = :stepOrder)"
    )
    List<OrderMember> search(
            @Param("key") String key,
            @Param("stepOrder") Integer stepOrder,
            Pageable pageable);

    @Query("SELECT SUM(o.total) FROM OrderMember o WHERE o.stepOrder = 2 AND o.orderDate BETWEEN :startDate AND :endDate")
    Double calculateRevenueForStepOrder2(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    // Query để tính tổng doanh thu từ tất cả các đơn hàng có stepOrder = 2
    @Query("SELECT SUM(o.total) FROM OrderMember o WHERE o.stepOrder = 2")
    Double calculateTotalRevenueForStepOrder2();


}
