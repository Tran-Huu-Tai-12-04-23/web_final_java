package com.example.backend.controller.admin;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Product;
import com.example.backend.model.ProductSpecification;
import com.example.backend.service.IProductService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/product")
@RequiredArgsConstructor
public class ProductAdminController {
    private final IProductService iProductService;

    @GetMapping("/count")
    public ResponseEntity<Long> countNumberProduct(
            @RequestParam(name = "key", required = false, defaultValue = "") String key,
            @RequestParam(name = "categoryId", required = false, defaultValue = "") Long categoryId,
            @RequestParam(name = "brandId", required = false, defaultValue = "") Long brandId,
            @RequestParam(name = "minPrice", required = false, defaultValue = "") Double minPrice,
            @RequestParam(name = "maxPrice", required = false, defaultValue = "") Double maxPrice,
            @RequestParam(name = "status", required = false, defaultValue = "true") Boolean status
    ) {
        return ResponseEntity.ok(iProductService.countProduct(key, categoryId,brandId, minPrice, maxPrice, status));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProduct(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        Utils.validatePageNumberAndSize(page, size);
        return ResponseEntity.ok(iProductService.getAllItemNotDelete(page, size));
    }

    @GetMapping("/all/state")
    public ResponseEntity<List<Product>> getAllProductByState(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size,
            @RequestParam(name = "state", required = false, defaultValue = "false") Boolean state
    ) {
        Utils.validatePageNumberAndSize(page, size);
        return ResponseEntity.ok(iProductService.getProductByState(state,page, size));
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

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
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
    @PutMapping("/update/{id}")
    public ResponseEntity<?> editProduct(@RequestBody Product product, @PathVariable Long id) {
        try{

            iProductService.validateProductRequest(product);
            Product updateProduct = iProductService.update(product, id);
            return ResponseEntity.ok(updateProduct);
        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @DeleteMapping("/delete-soft")
    public ResponseEntity<?> removeSoftProduct(@RequestParam Long id) {
        try{
            Product product = iProductService.changeDraft(id);
            return ResponseEntity.ok(product);

        }catch (Exception e) {
            e.printStackTrace();
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeProduct(@RequestParam Long id) {
        try{
            boolean deleteSoftProductResult = iProductService.delete(id);
            if( deleteSoftProductResult) {
                return ResponseEntity.ok("Delete product successfully!");
            }else {
                return ResponseEntity.status(HttpStatusCode.valueOf(400)).body("Delete product failed");
            }
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


}
