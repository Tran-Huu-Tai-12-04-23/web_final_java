package com.example.backend.service.impl;

import com.example.backend.dto.QuestionRequest;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Member;
import com.example.backend.model.Question;
import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.service.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService {
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;

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
        return questionRepository.findById(id);
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

    @Override
    public Question addNew(QuestionRequest questionRequest) {
        Question question = new Question();
        Optional<Member> memberOptional = memberRepository.findById(questionRequest.getMember().getId());
        if (memberOptional.isEmpty()){
            throw new NotFoundException("Member not found");
        }
        Member memberQuestion = memberOptional.get();
        question.setMember(memberQuestion);
        question.setProduct(questionRequest.getProduct());
        question.setContent(questionRequest.getContent());
        question.setIsDeleted(questionRequest.getDeleted());
        question.setIsReplied(questionRequest.getReplied());
        question.setCreateAt(questionRequest.getCreateAt());
        questionRepository.save(question);
        return questionRepository.findById(question.getId()).orElse(null);
    }

    @Override
    public List<Question> getAllQuestionDeleted(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return questionRepository.findByIsDeletedTrue(pageable).toList();
    }

    @Override
    public List<Question> getAllQuestionNotAnswered(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return questionRepository.findByIsRepliedFalse(pageable).toList();
    }

    @Override
    public List<Question> getAllQuestionAnswered(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return questionRepository.findByIsRepliedTrue(pageable).toList();
    }

    @Override
    public Question changeDeleteStatus(Long id, Boolean delete) {
        try{
            Question question = questionRepository.findById(id)
                    .orElseThrow(()->new NotFoundException("Question not found with id: "+ id));
            question.setIsDeleted(delete);
            return questionRepository.save(question);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating question status", e);
        }
    }

    @Override
    public Question changeReplyStatus(Long id, Boolean reply) {
        try{
            Question question = questionRepository.findById(id)
                    .orElseThrow(()->new NotFoundException("Question not found with id: "+ id));
            question.setIsDeleted(reply);
            return questionRepository.save(question);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating question status", e);
        }
    }
}
