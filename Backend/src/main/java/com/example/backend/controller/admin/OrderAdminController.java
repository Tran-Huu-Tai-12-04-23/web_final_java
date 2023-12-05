package com.example.backend.controller.admin;

import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.OrderMember;
import com.example.backend.model.Product;
import com.example.backend.model.ProductSpecification;
import com.example.backend.service.IProductService;
import com.example.backend.service.IUserOrderService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/order")
@RequiredArgsConstructor
public class OrderAdminController {
    private final IProductService iProductService;
    private final IUserOrderService iUserOrderService;

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
    public ResponseEntity<?> getAll(
            @RequestParam(name = "key", required = false, defaultValue = "") String key,
            @RequestParam(name = "stepOrder", required = false, defaultValue = "") Integer stepOrder,
            @RequestParam(name = "page", required = false, defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppConstants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        return ResponseEntity.ok(iUserOrderService.search(key, stepOrder,   page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetail(@PathVariable Long id ) {
        return ResponseEntity.ok(iUserOrderService.getDetailOrder(id));
    }

    @GetMapping("/change-step/{id}")
    public ResponseEntity<?> changeStepOrder(@PathVariable Long id,@RequestParam Integer stepOrder ) {
        return ResponseEntity.ok(iUserOrderService.changeStepOrder(id,stepOrder));
    }

}
