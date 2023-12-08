package com.example.backend.controller.publicpath;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Product;
import com.example.backend.model.ProductSpecification;
import com.example.backend.service.IProductService;
import com.example.backend.service.IReplyQuestionService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/public/product")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService iProductService;
    private final IReplyQuestionService iReplyQuestionService;


    @GetMapping("/reply-question/{questionId}")
    public ResponseEntity<?> getReplyQuestion(@PathVariable Long questionId) {
        return ResponseEntity.ok((iReplyQuestionService.getAllReplyQuestionByQuestionId(questionId)));

    }
    @GetMapping("/questions/{productId}")
    public ResponseEntity<?> getQuestionByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(iProductService.getQuestionProduct(productId));

    }
    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct(
            @RequestParam(name = "minPrice", required = false, defaultValue = "") Double minPrice,
            @RequestParam(name = "sortType", required = false, defaultValue = "ASC") String sortType,
            @RequestParam(name = "maxPrice", required = false, defaultValue = "") Double maxPrice,
            @RequestParam(name = "categoryId", required = false, defaultValue = "") Long categoryId,
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        Utils.validatePageNumberAndSize(page, size);
        return ResponseEntity.ok(iProductService.getAllProductUser(page, size, categoryId, minPrice, maxPrice,sortType, true));

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductDetail(@PathVariable Long id) {
        try{
            Optional<Product> product = iProductService.getProduct(id);
            ErrorResponse err = new ErrorResponse();
            err.setMessage("Product not found");
            return product.isPresent() ? ResponseEntity.ok(product.get()) : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try{
            System.out.println(product.toString());
            ProductSpecification productSpecification = product.getProductSpecification();

            if(productSpecification == null )   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Product Specification product is not null!");

            productSpecification = iProductService.createNewProductSpecification(productSpecification);

            if( productSpecification == null ) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload product failed!");
            }

            product.setProductSpecification(productSpecification);

            iProductService.validateProductRequest(product);
            return ResponseEntity.ok(iProductService.createNew(product));
        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }


    @GetMapping("/search")
    public ResponseEntity<?> searchProduct(
            @RequestParam(name = "sortType", required = false, defaultValue = "ASC") String sortType,
            @RequestParam(name = "key", required = false, defaultValue = "") String key,
            @RequestParam(name = "categoryId", required = false, defaultValue = "") Long categoryId,
            @RequestParam(name = "brandId", required = false, defaultValue = "") Long brandId,
            @RequestParam(name = "minPrice", required = false, defaultValue = "") Double minPrice,
            @RequestParam(name = "maxPrice", required = false, defaultValue = "") Double maxPrice,
            @RequestParam(name = "status", required = false, defaultValue = "true") Boolean status,
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try{
            Utils.validatePageNumberAndSize(page, size);
            List<Product> listProduct = iProductService.searchProductNotDeleteByCategoryAndBetweenPriceByStatus(key, page, size, categoryId, minPrice, maxPrice, sortType, status, brandId);
            return ResponseEntity.ok(listProduct);
        }catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST ).body(err);
        }
    }

    @GetMapping("/filter-by-category")
    public ResponseEntity<List<Product>> getProductByCategory(
            @RequestParam(name = "name-category", required = false, defaultValue = "") String nameCategory,
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        Utils.validatePageNumberAndSize(page, size);
        return ResponseEntity.ok(iProductService.getProductByCategory(nameCategory,page, size));
    }

}
