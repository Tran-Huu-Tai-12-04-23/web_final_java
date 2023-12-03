package com.example.backend.controller.admin;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Account;
import com.example.backend.model.Question;
import com.example.backend.model.ReplyQuestion;
import com.example.backend.service.IAccountService;
import com.example.backend.service.IQuestionService;
import com.example.backend.service.IReplyQuestionService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/question")
@RequiredArgsConstructor
public class QuestionController {
    private final IQuestionService iQuestionService;

    @GetMapping()
    public ResponseEntity<?> getAllQuestionNotDelete(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ){
        try{
            Utils.validatePageNumberAndSize(page, size);
            return ResponseEntity.ok(iQuestionService.getAll(page, size));
        }catch(Exception e){
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @GetMapping("/trash")
    public ResponseEntity<?> getAllQuestionDeleted(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ){
        try{
            Utils.validatePageNumberAndSize(page, size);
            return ResponseEntity.ok(iQuestionService.getAllQuestionDeleted(page, size));
        }catch (Exception e){
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @GetMapping("/not-answered")
    public ResponseEntity<?> getAllQuestionNotAnswered(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ){
        try{
            Utils.validatePageNumberAndSize(page,size);
            return ResponseEntity.ok(iQuestionService.getAllQuestionNotAnswered(page, size));
        }catch(Exception e){
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @GetMapping("/answered")
    public ResponseEntity<?> getAllQuestionAnswered(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ){
        try{
            Utils.validatePageNumberAndSize(page,size);
            return ResponseEntity.ok(iQuestionService.getAllQuestionAnswered(page, size));
        }catch(Exception e){
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeQuestion(@PathVariable Long id){
        try{
            iQuestionService.delete(id);
            return ResponseEntity.ok("Delete product successfully!");
        }catch(Exception e){
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @DeleteMapping("/delete-soft")
    public ResponseEntity<?> softRemoveQuestion(@RequestParam Long id){
        try{
            Question question = iQuestionService.changeDeleteStatus(id,true);
            if (question != null){
                return ResponseEntity.ok("Delete question successfully!");
            }else{
                ErrorResponse err = new ErrorResponse();
                err.setMessage("Question is not found");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }
        }catch (Exception e){
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

}
