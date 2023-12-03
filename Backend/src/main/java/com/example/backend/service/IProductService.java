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
    List<Product> getAllItemNotDelete(Integer page, Integer size);
    Optional<Product> getProduct(Long id);

    void validateProductRequest(Product product);

    List<Product> search(String key, Integer page, Integer size);
    List<Product> searchProductNotDeleteByCategory(String key, Integer page, Integer size, Long categoryId);

    ProductSpecification createNewProductSpecification(ProductSpecification productSpecification);

    List<Product> getProductByCategory(String nameCategory, Integer page, Integer size);
    List<Product> getProductByState(Boolean state, Integer page, Integer size);

    List<Product> getAllItemNotDeleteAndCategory(Integer page, Integer size, Long categoryId);
    List<Product> getAllItemNotDeleteAndCategoryBetweenPrice(Integer page, Integer size, Long categoryId, Double minPrice, Double maxPrice, String sortType);
    List<Product> searchProductNotDeleteByCategoryAndBetweenPrice(String key, Integer page, Integer size, Long categoryId, Double minPrice, Double maxPrice, String sortType);
}
