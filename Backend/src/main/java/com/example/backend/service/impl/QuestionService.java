package com.example.backend.service.impl;

import com.example.backend.exception.MainException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Product;
import com.example.backend.model.Question;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.service.IProductService;
import com.example.backend.service.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService {
    private final QuestionRepository questionRepository;


    @Override
    public Question createNew(Question ques) throws Exception {
        return questionRepository.save(ques);
    }



    @Override
    public boolean delete(Long id) {
        try {
            questionRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Question update(Question ques, Long id) {
        return questionRepository.findById(id).map(question -> {
            ques.setContent(ques.getContent());
            return questionRepository.save(ques);
        }).orElseThrow(() -> new NotFoundException("Sorry, ths product could not be found"));
    }


    @Override
    public List<Question> getAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return questionRepository.findAll(pageable).toList();
    }

    @Override
    public Optional<Question> getQuestion(Long id) {
        return Optional.empty();
    }



    @Override
    public List<Question> search(String key, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        List<Question> listQuestion = questionRepository.findByContentContains(key, pageable);
        if( listQuestion.isEmpty() ) {
            throw  new NotFoundException("Can't search question with " + key);
        }else {
            return  listQuestion;
        }
    }
}
