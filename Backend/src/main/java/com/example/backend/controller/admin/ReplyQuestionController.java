package com.example.backend.controller.admin;

import com.example.backend.model.Account;
import com.example.backend.model.Question;
import com.example.backend.model.ReplyQuestion;
import com.example.backend.service.IAccountService;
import com.example.backend.service.IQuestionService;
import com.example.backend.service.IReplyQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/reply-question")
@RequiredArgsConstructor
public class ReplyQuestionController {
    private final IQuestionService iQuestionService;
    private final IReplyQuestionService iReplyQuestionService;
    private final IAccountService iAccountService;
    @PostMapping("/{questionId}")
    public ResponseEntity<?> replyToQuestion(
            @PathVariable Long questionId,
            @RequestBody ReplyQuestion replyQuestion) {
        try {
            Question question = iQuestionService.getQuestion(questionId).orElse(null);
            if (question == null) {
                return ResponseEntity.badRequest().body("Cannot find the corresponding question.");
            }
            replyQuestion.setQuestion(question);
            Account admin = iAccountService.getAccount(1L).get();
            replyQuestion.setAccount(admin);
            ReplyQuestion reply = iReplyQuestionService.addReply(replyQuestion);
            return ResponseEntity.ok(reply);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
