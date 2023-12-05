package com.example.backend.repository;

import com.example.backend.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByContentContains(String key, Pageable pageable);
    List<Question> findByProduct_Id(Long productId);
    Page<Question> findByIsDeletedTrue(Pageable pageable);
    Page<Question> findByIsRepliedFalse(Pageable pageable);
    Page<Question> findByIsRepliedTrue(Pageable pageable);
}
