package com.example.backend.repository;

import com.example.backend.model.Blog;
import com.example.backend.model.ReviewOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<ReviewOrder, Long> {


}
