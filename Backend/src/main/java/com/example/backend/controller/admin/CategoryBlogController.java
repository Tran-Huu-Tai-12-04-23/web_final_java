package com.example.backend.controller.admin;

import com.example.backend.model.Category;
import com.example.backend.model.CategoryBlog;
import com.example.backend.service.ICategoryBlogService;
import com.example.backend.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/blog/category")
@RequiredArgsConstructor
public class CategoryBlogController {
    private final ICategoryBlogService iCategoryBlogService;

    @GetMapping("/all")
    public ResponseEntity<List<CategoryBlog>> getAllBranch() {
        return ResponseEntity.ok(iCategoryBlogService.getAll());
    }

    @PostMapping("/create")
    public ResponseEntity<CategoryBlog> createNew(@RequestBody CategoryBlog categoryBlog) {
        return ResponseEntity.ok(iCategoryBlogService.create(categoryBlog));
    }

    @PutMapping("/edit")
    public ResponseEntity<CategoryBlog> edit(@RequestBody CategoryBlog categoryBlog, @RequestBody Long id) {
        return ResponseEntity.ok(iCategoryBlogService.update(categoryBlog, id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        iCategoryBlogService.delete(id);
        return ResponseEntity.ok("Delete category blog successfully!");
    }

}
