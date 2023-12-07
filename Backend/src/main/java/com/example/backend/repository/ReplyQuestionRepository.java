package com.example.backend.repository;

import com.example.backend.model.ReplyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyQuestionRepository extends JpaRepository<ReplyQuestion,Long> {
    List<ReplyQuestion> findByQuestion_Id(Long questionId);
}
