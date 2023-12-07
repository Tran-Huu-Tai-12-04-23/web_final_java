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

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/reply-question")
@RequiredArgsConstructor
public class ReplyQuestionController {
    private final IQuestionService iQuestionService;
    private final IReplyQuestionService iReplyQuestionService;


    @PutMapping("/update/{rplQuestionId}")
    public ResponseEntity<?> getReplyQuestionByQuestion(
            @PathVariable Long rplQuestionId, @RequestBody ReplyQuestion replyQuestion) {
        try {
            ReplyQuestion replyQuestionNew = iReplyQuestionService.updateReplyQuestion(rplQuestionId, replyQuestion);
            return ResponseEntity.ok(replyQuestionNew);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<?> getReplyQuestionByQuestion(
            @PathVariable Long questionId) {
        try {
            List<ReplyQuestion> replyQuestions = iReplyQuestionService.getAllReplyQuestionByQuestionId(questionId);
            return ResponseEntity.ok(replyQuestions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
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
            iQuestionService.changeReplyStatus(questionId,true);
            ReplyQuestion reply = iReplyQuestionService.addReply(replyQuestion);
            return ResponseEntity.ok(reply);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
