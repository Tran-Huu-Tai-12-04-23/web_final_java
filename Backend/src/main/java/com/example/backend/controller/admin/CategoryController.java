package com.example.backend.controller.admin;

import com.example.backend.model.Branch;
import com.example.backend.model.Category;
import com.example.backend.service.IBranchService;
import com.example.backend.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/category")
@RequiredArgsConstructor
public class CategoryController {
    private final ICategoryService iCategoryService;

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategory() {
        return ResponseEntity.ok(iCategoryService.getAll());
    }

    @PostMapping("/create")
    public ResponseEntity<Category> createNewCategory(@RequestBody Category category) {
        return ResponseEntity.ok(iCategoryService.createNew(category));
    }

    @PutMapping("/edit")
    public ResponseEntity<Category> editCategory(@RequestBody Category category, @RequestBody Long id) {
        return ResponseEntity.ok(iCategoryService.update(category, id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        iCategoryService.delete(id);
        return ResponseEntity.ok("Delete category successfully!");
    }

}
