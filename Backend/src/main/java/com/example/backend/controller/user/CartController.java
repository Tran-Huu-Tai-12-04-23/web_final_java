package com.example.backend.controller.user;

import com.example.backend.dto.CartRequest;
import com.example.backend.dto.ErrorResponse;
import com.example.backend.model.Cart;
import com.example.backend.model.Member;
import com.example.backend.model.Product;
import com.example.backend.model.ProductSpecification;
import com.example.backend.service.ICartService;
import com.example.backend.service.IProductService;
import com.example.backend.utils.AppConstants;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/cart")
@RequiredArgsConstructor
public class CartController {
    private final ICartService iCartService;

    @PostMapping
    public ResponseEntity<?> addProductToCart(@RequestBody CartRequest cartRequest) {
        try {
            Product product = iCartService.addToCart(cartRequest.getProductId(), cartRequest.getMemberId());
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add product to cart.");
        }
    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestParam Long mId) {
        try {
            Cart cart = iCartService.getDetailCartByMember(mId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("failed get detail cart");
        }
    }

    @GetMapping("/size")
    public ResponseEntity<?> countItemCart(@RequestParam Long mId) {
        try {
            int quantity = iCartService.countItemCart(mId);
            return ResponseEntity.ok(quantity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("failed get detail cart");
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeItemCart(@RequestParam Long mId, Long proId) {
        try {
            Cart cart = iCartService.removeItemFromCart(mId, proId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("failed get detail cart");
        }
    }


}
