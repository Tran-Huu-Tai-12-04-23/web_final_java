package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByAccount(Account account);

    List<Member> findByEmailContaining(String email, Pageable pageable);

    List<Member> findAllByIsDeleteFalse(Pageable pageable);
    List<Member> findAllByIsDeleteFalseAndStatus(Pageable pageable, Boolean status);
    List<Member> findAllByIsDeleteTrueAndStatus(Pageable pageable, Boolean status);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);

    @Query("SELECT m FROM Member m JOIN m.account a " +
            "WHERE (:key IS NULL OR m.email LIKE CONCAT('%', :key, '%') OR m.phoneNumber LIKE CONCAT('%', :key, '%') OR a.username LIKE CONCAT('%', :key, '%')) " +
            "AND m.status = :status AND m.isDelete = :isDelete")
    List<Member> searchMembers(
            @Param("key") String key,
            @Param("status") Boolean status,
            @Param("isDelete") Boolean isDelete,
            Pageable pageable);

}
