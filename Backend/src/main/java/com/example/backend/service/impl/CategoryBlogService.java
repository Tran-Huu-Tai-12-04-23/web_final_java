package com.example.backend.service.impl;

import com.example.backend.exception.AlreadyExistException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Category;
import com.example.backend.model.CategoryBlog;
import com.example.backend.repository.CategoryBlogRepository;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.ICategoryBlogService;
import com.example.backend.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryBlogService implements ICategoryBlogService {

    private final CategoryBlogRepository categoryBlogRepository;

    @Override
    public CategoryBlog create(CategoryBlog categoryBlog) {
        Optional<CategoryBlog> categoryBlogExist = Optional.ofNullable(categoryBlogRepository.findByNameCategory(categoryBlog.getNameCategory()));
        if( categoryBlogExist.isPresent() ) {
            throw  new AlreadyExistException("Category is exist!");
        }else {
            return categoryBlogRepository.save(categoryBlog);
        }
    }


    @Override
    public void delete(Long id) {
        categoryBlogRepository.deleteById(id);
    }

    @Override
    public CategoryBlog update(CategoryBlog categoryBlog, Long id) {
        return categoryBlogRepository.findById(id).map(cateBlog -> {
            cateBlog.setNameCategory(categoryBlog.getNameCategory());
            return categoryBlogRepository.save(cateBlog);
        }).orElseThrow(() -> new NotFoundException("Category blog not found"));
    }

    @Override
    public List<CategoryBlog> getAll() {
        return categoryBlogRepository.findAll();
    }

    @Override
    public Optional<CategoryBlog> get(Long id) {
        return categoryBlogRepository.findById(id);
    }
}
