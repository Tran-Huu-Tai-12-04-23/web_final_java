package com.example.backend.service;

import com.example.backend.model.ReplyQuestion;

import java.util.List;

public interface IReplyQuestionService {
    ReplyQuestion addReply(ReplyQuestion replyQuestion);

    List<ReplyQuestion> getAllReplyQuestionByQuestionId(Long questionId);
    ReplyQuestion updateReplyQuestion(Long rplQuestionId, ReplyQuestion replyQuestion);

}
