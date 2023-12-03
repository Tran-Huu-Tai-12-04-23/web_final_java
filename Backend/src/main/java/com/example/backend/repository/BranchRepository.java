package com.example.backend.repository;

import com.example.backend.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BranchRepository extends JpaRepository<Brand, Long> {
}
