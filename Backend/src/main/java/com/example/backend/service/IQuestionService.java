package com.example.backend.service;

import com.example.backend.dto.QuestionRequest;
import com.example.backend.model.Product;
import com.example.backend.model.Question;

import java.util.List;
import java.util.Optional;

public interface IQuestionService {
    Question createNew(Question ques) throws Exception;
    boolean delete(Long id);
    Question update(Question ques, Long id);
    List<Question> getAll(Integer page, Integer size);
    Optional<Question> getQuestion(Long id);
    List<Question> search(String key, Integer page, Integer size);
    Question addNew(QuestionRequest questionRequest);

    List<Question> getAllQuestionDeleted(Integer page, Integer size);
    List<Question> getAllQuestionNotAnswered(Integer page, Integer size);
    List<Question> getAllQuestionAnswered(Integer page, Integer size);
    Question changeDeleteStatus(Long id, Boolean delete);
}
