package com.example.backend.repository;

import com.example.backend.model.CategoryBlog;
import com.example.backend.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryBlogRepository extends JpaRepository<CategoryBlog, Long> {
    CategoryBlog findByNameCategory(String name);
}
