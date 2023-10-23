package com.example.backend.service.impl;

import com.example.backend.exception.AlreadyExistException;
import com.example.backend.exception.MainException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.Blog;
import com.example.backend.model.Member;
import com.example.backend.model.Product;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BlogRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.service.IBlogService;
import com.example.backend.service.IMemberService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService implements IBlogService {

    private final BlogRepository blogRepository;


    @Override
    public Blog create(Blog blog) {
            Optional<Blog> blogExist = blogRepository.findByTitle(blog.getTitle());

            if( blogExist.isPresent() ) {
                throw  new AlreadyExistException("Blog is exist!");
            }
            else {
                return blogRepository.save(blog);
            }
    }

    @Override
    public Blog update(Blog blog, Long id) {
        return blogRepository.findById(id).map( bl -> {
            bl.setTitle(blog.getTitle());
            bl.setCategoryBlog(blog.getCategoryBlog());
            bl.setContent(blog.getContent());
            return blogRepository.save(bl);
        }).orElseThrow(() -> new NotFoundException("Blog is not found!"));
    }

    @Override
    public List<Blog> getAllBlogDeleteFalse(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return blogRepository.findByIsDeleteFalse(pageable).toList();
    }

    @Override
    public List<Blog> getAllBlogDeleteTrue(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return blogRepository.findByIsDeleteTrue(pageable).toList();
    }

    @Override
    public Optional<Blog> get(Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        return Optional.ofNullable(blog.orElseThrow(() -> new NotFoundException("Blog is not found!")));
    }

    @Override
    public Blog changeStatusDelete(Long id, Boolean delete) {
        return blogRepository.findById(id).map(bl -> {
            bl.setIsDelete(delete);
            return blogRepository.save(bl);
        }).orElseThrow(() -> new NotFoundException("Blog not found"));
    }

    @Override
    public void delete(Long id) {
        blogRepository.deleteById(id);
    }

    @Override
    public List<Blog> search(String key, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        List<Blog> listBlog = blogRepository.findByTitleContainingOrContentContaining(key, key, pageable);
        if( listBlog.isEmpty() ) {
            throw  new NotFoundException("Can't search blog with " + key);
        }else {
            return  listBlog;
        }
    }

    @Override
    public void validateBlogRequest(Blog blog) {
        if (blog.getTitle() == null || blog.getTitle().isEmpty()) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide title for blog! ");
        }
        if (blog.getCategoryBlog() == null ) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide a valid category for the blog.");
        }
        if (blog.getContent() == null || blog.getContent().isEmpty()) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide a content  for the blog.");
        }
    }
}
