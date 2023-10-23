package com.example.backend.controller.admin;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Member;
import com.example.backend.model.Product;
import com.example.backend.service.IProductService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/product")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService iProductService;
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProduct(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        Utils.validatePageNumberAndSize(page, size);
        return ResponseEntity.ok(iProductService.getAll(page, size));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try{
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
    public ResponseEntity<?> removeSoftProduct(@RequestBody Long id) {
        try{
            boolean deleteSoftProductResult = iProductService.deleteSoft(id);
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

    @DeleteMapping
    public ResponseEntity<?> removeProduct(@RequestBody Long id) {
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
            @RequestParam String key,
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try{
            Utils.validatePageNumberAndSize(page, size);
            List<Product> listProduct = iProductService.search(key, page, size);
            if(listProduct.isEmpty()) {
                ErrorResponse err = new ErrorResponse();
                err.setMessage("Can't find product with " + key);
                return  ResponseEntity.status(HttpStatus.BAD_REQUEST ).body(err);
            }else {
                return ResponseEntity.ok(listProduct);
            }
        }catch (Exception e) {
            ErrorResponse err = new ErrorResponse();
            err.setMessage(e.getMessage());
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST ).body(err);
        }
    }
}