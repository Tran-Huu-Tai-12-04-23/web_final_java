package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.model.ProductSpecification;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    Product createNew(Product pro) throws Exception;
    boolean deleteSoft(Long id);
    boolean delete(Long id);
    Product update(Product pro, Long id);
    List<Product> getAll(Integer page, Integer size);
    Optional<Product> getProduct(Long id);

    void validateProductRequest(Product product);

    List<Product> search(String key, Integer page, Integer size);

    ProductSpecification createNewProductSpecification(ProductSpecification productSpecification);

}
