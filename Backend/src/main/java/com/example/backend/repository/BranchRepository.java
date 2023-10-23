package com.example.backend.repository;

import com.example.backend.model.Branch;
import com.example.backend.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BranchRepository extends JpaRepository<Branch, Long> {
}
