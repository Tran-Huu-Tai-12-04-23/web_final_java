package com.example.backend.service;
import com.example.backend.model.CategoryBlog;

import java.util.List;
import java.util.Optional;

public interface ICategoryBlogService {
    CategoryBlog create(CategoryBlog categoryBlog) ;
    void delete(Long id);
    CategoryBlog update(CategoryBlog categoryBlog, Long id);
    List<CategoryBlog> getAll();
    Optional<CategoryBlog> get(Long id);

}
