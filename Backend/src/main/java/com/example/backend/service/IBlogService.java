package com.example.backend.service;

import com.example.backend.model.Blog;
import com.example.backend.model.CategoryBlog;

import java.util.List;
import java.util.Optional;

public interface IBlogService {
    Blog create(Blog blog);
    Blog update(Blog blog, Long id);
    List<Blog> getAllBlogDeleteFalse(Integer page,Integer size);
    List<Blog> getAllBlogDeleteTrue(Integer page,Integer size);

    Optional<Blog> get(Long id);
    Blog changeStatusDelete(Long id, Boolean delete);
    void delete(Long id);

    List<Blog> search(String key, Integer page,Integer size);

    void validateBlogRequest(Blog blog);
    List<CategoryBlog> getAllCategory();

}
