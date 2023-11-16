package com.example.backend.controller.publicpath;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Product;
import com.example.backend.model.ProductSpecification;
import com.example.backend.service.IProductService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/product")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService iProductService;
    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct(
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        Utils.validatePageNumberAndSize(page, size);
        return ResponseEntity.ok(iProductService.getAllItemNotDelete(page, size));
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
