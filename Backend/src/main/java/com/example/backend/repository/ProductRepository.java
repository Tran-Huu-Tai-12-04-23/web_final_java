package com.example.backend.repository;

import com.example.backend.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);

    List<Product> findByNameContaining(String key, Pageable pageable);

    List<Product> findAllByIsDeleteFalse(Pageable pageable);

    List<Product> findByCategory(String nameCategory, Pageable pageable);
}
