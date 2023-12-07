package com.example.backend.service.impl;

import com.example.backend.exception.NotFoundException;
import com.example.backend.model.ReplyQuestion;
import com.example.backend.repository.ReplyQuestionRepository;
import com.example.backend.service.IReplyQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReplyQuestionService implements IReplyQuestionService {
    private final ReplyQuestionRepository replyQuestionRepository;
    @Override
    public ReplyQuestion addReply(ReplyQuestion replyQuestion) {
        return replyQuestionRepository.save(replyQuestion);
    }

    @Override
    public List<ReplyQuestion> getAllReplyQuestionByQuestionId(Long questionId) {
        return replyQuestionRepository.findByQuestion_Id(questionId);
    }

    @Override
    public ReplyQuestion updateReplyQuestion(Long rplQuestionId, ReplyQuestion replyQuestion) {
        Optional<ReplyQuestion> replQuestioonOptional = replyQuestionRepository.findById(rplQuestionId);
        if(replQuestioonOptional.isEmpty()) throw new NotFoundException("Reply question not found");

        ReplyQuestion rplQues = replQuestioonOptional.get();
        rplQues.setContent(replyQuestion.getContent());
        return replyQuestionRepository.save(rplQues);
    }
}
