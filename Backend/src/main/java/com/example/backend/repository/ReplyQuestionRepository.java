package com.example.backend.repository;

import com.example.backend.model.ReplyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyQuestionRepository extends JpaRepository<ReplyQuestion,Long> {
}
