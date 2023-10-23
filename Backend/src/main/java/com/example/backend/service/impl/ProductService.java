package com.example.backend.service.impl;

import com.example.backend.exception.MainException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.Member;
import com.example.backend.model.Product;
import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;

    @Override
    public Product createNew(Product pro) throws Exception {
        Optional<Product> proExist = productRepository.findByName(pro.getName());
        if( proExist.isPresent()) {
            throw new Exception("Product is exist!");
        }else {
            return productRepository.save(pro);
        }

    }

    @Override
    public boolean deleteSoft(Long id) {
        return productRepository.findById(id).map(pro -> {
            pro.setIsDelete(true);
            productRepository.save(pro);
            return true;
        }).orElseThrow(() -> new NotFoundException("Sorry, this product could not be found"));
    }

    @Override
    public boolean delete(Long id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Product update(Product product, Long id) {
        return productRepository.findById(id).map(pro -> {
            pro.setIsDelete(product.getIsDelete());
            pro.setName(product.getName());
            pro.setBranch(product.getBranch());
            pro.setChipSet(product.getChipSet());
            pro.setCategory(product.getCategory());
            pro.setQuantity(product.getQuantity());
            pro.setLinkImages(product.getLinkImages());
            return productRepository.save(pro);
        }).orElseThrow(() -> new NotFoundException("Sorry, ths product could not be found"));
    }

    @Override
    public List<Product> getAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return productRepository.findAll(pageable).toList();
    }

    @Override
    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public  void validateProductRequest(Product product) {
        if (product.getName() == null || product.getName().isEmpty()) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide name for product! ");
        }
        if (product.getPrice() == null || product.getPrice() <= 0) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide a valid price for the product.");
        }
        if (product.getQuantity() == null || product.getQuantity() < 0) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide a valid quantity for the product.");
        }
        if (product.getCategory() == null) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide a category for the product.");
        }
        if (product.getBranch() == null) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide a branch for the product.");
        }
        if (product.getDescription() == null || product.getDescription().isEmpty()) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide a description for the product.");
        }
        if (product.getLinkImages() == null || product.getLinkImages().isEmpty()) {
            throw new MainException(HttpStatus.BAD_REQUEST, "Please provide at least one image link for the product.");
        }
    }

    @Override
    public List<Product> search(String key, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        List<Product> listProduct = productRepository.findByNameContaining(key, pageable);
        if( listProduct.isEmpty() ) {
            throw  new NotFoundException("Can't search product with " + key);
        }else {
            return  listProduct;
        }
    }
}