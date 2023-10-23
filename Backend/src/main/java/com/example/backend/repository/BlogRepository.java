package com.example.backend.repository;

import com.example.backend.model.Blog;
import com.example.backend.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Blog> findByTitle(String title);
    Page<Blog> findByIsDeleteFalse(Pageable pageable);
    Page<Blog> findByIsDeleteTrue(Pageable pageable);

    List<Blog> findByTitleContainingOrContentContaining(String keyTitle,String keyContent, Pageable pageable);

}
