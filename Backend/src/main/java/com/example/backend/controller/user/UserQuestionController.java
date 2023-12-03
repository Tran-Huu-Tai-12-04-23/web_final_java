package com.example.backend.controller.user;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.dto.QuestionRequest;
import com.example.backend.model.Question;
import com.example.backend.service.IQuestionService;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user/question")
@RequiredArgsConstructor
public class UserQuestionController {
    private final IQuestionService iQuestionService;
    @PostMapping("/add-question")
    public ResponseEntity<?> addQuestion(@RequestBody QuestionRequest questionRequest){
        try{
            Utils.validateQuestionRequest(questionRequest);
            Question question = iQuestionService.addNew(questionRequest);
            if (question == null){
                return ResponseEntity.badRequest().body("Failed to add question.");
            }else {
                return ResponseEntity.ok(question);
            }
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id){
        try{
            iQuestionService.delete(id);
            return ResponseEntity.ok("Delete question successfully!");
        }catch(Exception e){
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
}
