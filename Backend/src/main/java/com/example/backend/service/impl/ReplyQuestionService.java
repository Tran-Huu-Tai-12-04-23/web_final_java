package com.example.backend.service.impl;

import com.example.backend.model.ReplyQuestion;
import com.example.backend.repository.ReplyQuestionRepository;
import com.example.backend.service.IReplyQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReplyQuestionService implements IReplyQuestionService {
    private final ReplyQuestionRepository replyQuestionRepository;
    @Override
    public ReplyQuestion addReply(ReplyQuestion replyQuestion) {
        return replyQuestionRepository.save(replyQuestion);
    }
}
