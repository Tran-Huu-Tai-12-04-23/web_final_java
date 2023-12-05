package com.example.backend.controller.publicpath;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Blog;
import com.example.backend.service.IBlogService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/public/blog")
@RequiredArgsConstructor
public class PublicBlogController {
    private final IBlogService iBlogService;
    @GetMapping()
    public ResponseEntity<?> getAllBlogNotDelete(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try{
            Utils.validatePageNumberAndSize(page, size);
            return ResponseEntity.ok(iBlogService.getAllBlogDeleteFalseAndPublish(page, size));
        }catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getBlog(@PathVariable Long id) {
        try{
            Optional<Blog>  blog = iBlogService.get(id);
            ErrorResponse err = new ErrorResponse();
            err.setMessage("Blog not found");
            return blog.isPresent() ? ResponseEntity.ok(blog.get()) : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchBlog(
            @RequestParam String key,
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try{
            Utils.validatePageNumberAndSize(page, size);
            List<Blog> listProduct = iBlogService.search(key, page, size);
            if(listProduct.isEmpty()) {
                ErrorResponse err = new ErrorResponse();
                err.setMessage("Can't find blog with " + key);
                return  ResponseEntity.status(HttpStatus.BAD_REQUEST ).body(err);
            }else {
                return ResponseEntity.ok(listProduct);
            }
        }catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST ).body(err);
        }
    }
}
