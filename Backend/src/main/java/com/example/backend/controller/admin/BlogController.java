package com.example.backend.controller.admin;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Blog;
import com.example.backend.model.Product;
import com.example.backend.service.IBlogService;
import com.example.backend.service.IProductService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/blog")
@RequiredArgsConstructor
public class BlogController {
    private final IBlogService iBlogService;
    @GetMapping()
    public ResponseEntity<?> getAllBlogNotDelete(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try{
            Utils.validatePageNumberAndSize(page, size);
            return ResponseEntity.ok(iBlogService.getAllBlogDeleteFalse(page, size));
        }catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @GetMapping("/trash")
    public ResponseEntity<?> getAllBlogDeleteTrue(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try{
            Utils.validatePageNumberAndSize(page, size);
            return ResponseEntity.ok(iBlogService.getAllBlogDeleteTrue(page, size));
        }catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @PostMapping
    public ResponseEntity<?> createBlog(@RequestBody Blog blog) {
        try{
            iBlogService.validateBlogRequest(blog);
            return ResponseEntity.ok(iBlogService.create(blog));
        }catch (Exception e) {
            e.printStackTrace();
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
            err.setMessage("Product not found");
            return blog.isPresent() ? ResponseEntity.ok(blog.get()) : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> editBlog(@RequestBody Blog blog, @PathVariable Long id) {
        try{
            iBlogService.validateBlogRequest(blog);
            Blog updateBlog = iBlogService.update(blog, id);
            return ResponseEntity.ok(updateBlog);
        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @DeleteMapping("/delete-soft")
    public ResponseEntity<?> removeSoftBlog(@RequestParam Long id) {
        try{
            Blog blog = iBlogService.changeStatusDelete(id, true);
            if( blog != null ) {
                return ResponseEntity.ok("Delete blog successfully!");
            }else {
                ErrorResponse err = new ErrorResponse();
                err.setMessage("Blog is not found");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }
    @PutMapping("/restore")
    public ResponseEntity<?> restoreBlog(@RequestBody Long id) {
        try{
            Blog blog = iBlogService.changeStatusDelete(id,  false);
            if( blog != null ) {
                return ResponseEntity.ok("Restore blog successfully!");
            }else {
                ErrorResponse err = new ErrorResponse();
                err.setMessage("Blog is not found");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
            }

        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeBlog(@RequestBody Long id) {
        try{
            iBlogService.delete(id);
            return ResponseEntity.ok("Delete product successfully!");
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
