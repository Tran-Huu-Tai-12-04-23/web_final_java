package com.example.backend.service;

import com.example.backend.model.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    Category createNew(Category category);
    void delete(Long id);
    Category update(Category category, Long id);
    List<Category> getAll();
    Optional<Category> getCategory(Long id);

}
