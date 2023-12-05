package com.example.backend.service.impl;

import com.example.backend.exception.MainException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.model.ProductSpecification;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.ProductSpecificationRepository;
import com.example.backend.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final ProductSpecificationRepository productSpecificationRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Long countProductByStatus(Boolean status) {
        return productRepository.countAllByStatus(status);
    }

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
            pro.setName(product.getName());
            pro.setBrand(product.getBrand());
            pro.setDescription(product.getDescription());
            pro.setProductSpecification(pro.getProductSpecification());
            pro.setShortDescription(pro.getShortDescription());
            pro.setThumbnails(product.getThumbnails());
            pro.setColor(product.getColor());
            pro.setChipSet(product.getChipSet());
            pro.setDatePublished(new Date());
            pro.setScreenSize(product.getScreenSize());
            pro.setScreenSize(product.getScreenSize());
            pro.setStatus(product.getStatus());
            pro.setLaunchDate(new Date());
            pro.setQuantity(product.getQuantity());
            pro.setLinkImages(product.getLinkImages());
            return productRepository.save(pro);
        }).orElseThrow(() -> new NotFoundException("Sorry, ths product could not be found"));
    }

    @Override
    public List<Product> getAllItemNotDelete(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return productRepository.findAllByIsDeleteFalse(pageable);
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
        if (product.getBrand() == null) {
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
        List<Product> listProduct = productRepository.searchProductNotDeleteByNameBrandCategoryContaining(key, pageable);
        if( listProduct.isEmpty() ) {
            throw  new NotFoundException("Can't search product with " + key);
        }else {
            return  listProduct;
        }
    }

    @Override
    public List<Product> searchProductNotDeleteByCategory(String key, Integer page, Integer size, Long categoryId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        List<Product> listProduct = productRepository.searchProductNotDeleteByNameBrandCategoryContainingAndCategory(key, categoryId, pageable);
        if( listProduct.isEmpty() ) {
            throw  new NotFoundException("Can't search product with " + key);
        }else {
            return  listProduct;
        }
    }

    @Override
    public ProductSpecification createNewProductSpecification(ProductSpecification productSpecification) {
        return productSpecificationRepository.save(productSpecification);
    }

    @Override
    public List<Product> getProductByCategory(String nameCategory, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return null;
    }

    @Override
    public List<Product> getProductByState(Boolean state, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        return productRepository.findAllByStatus(state, pageable);
    }

    @Override
    public List<Product> getAllItemNotDeleteAndCategory(Integer page, Integer size, Long categoryId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category not found!"));

        System.out.println(category.getNameCategory());

        return productRepository.findAllByIsDeleteFalseAndCategory(pageable, category);
    }

    @Override
    public List<Product> getAllItemNotDeleteAndCategoryBetweenPrice(Integer page, Integer size, Long categoryId, Double minPrice, Double maxPrice, String sortType) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "price"));
        if( sortType.equals("DESC")) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "price"));
        }

        return productRepository.getAllProductNotDeleteByNameBrandCategoryContainingAndCategoryAndBetweenPrice(categoryId, minPrice, maxPrice, pageable);

    }

    @Override
    public List<Product> searchProductNotDeleteByCategoryAndBetweenPrice(String key, Integer page, Integer size, Long categoryId, Double minPrice, Double maxPrice, String sortType) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "price"));
        if( sortType.equals("DESC")) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "price"));
        }
        return productRepository.searchProductNotDeleteByNameBrandCategoryContainingAndCategoryAndBetweenPrice(key,categoryId, minPrice, maxPrice, pageable);
    }

    @Override
    public List<Product> searchProductNotDeleteByCategoryAndBetweenPriceByStatus(String key,
                                                                                 Integer page, Integer size, Long categoryId, Double minPrice,
                                                                                 Double maxPrice, String sortType, Boolean status, Long brandId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "price"));
        if( sortType.equals("DESC")) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "price"));
        }
        return productRepository.searchProductNotDeleteByNameBrandCategoryContainingAndCategoryAndBetweenPriceAndStatus(key,categoryId,brandId, minPrice, maxPrice, status, pageable);
    }

    @Override
    public Long countProduct(String key, Long categoryId,Long brandId, Double minPrice, Double maxPrice, Boolean status) {
        return productRepository.countProductNotDelete(key,categoryId,brandId, minPrice, maxPrice, status);

    }

    @Override
    public Product changeDraft(Long productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if( productOptional.isEmpty() ) {
            throw new NotFoundException("Product not found!");
        }

        Product product = productOptional.get();
        product.setStatus(false);
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProductUser(Integer page, Integer size, Long categoryId, Double minPrice, Double maxPrice, String sortType, Boolean status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "price"));
        if( sortType.equals("DESC")) {
            pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "price"));
        }
        return productRepository.searchProductNotDeleteByNameBrandCategoryContainingAndCategoryAndBetweenPriceAndStatus("",categoryId,null, minPrice, maxPrice, status, pageable);

    }
}
