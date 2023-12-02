package com.example.backend.controller.user;

import com.example.backend.dto.CartRequest;
import com.example.backend.dto.CartUpdateRequest;
import com.example.backend.model.*;
import com.example.backend.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user/cart")
@RequiredArgsConstructor
public class UserCartController {
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

    @PutMapping("/update-quantity")
    public ResponseEntity<?> updateQuantityCart(@RequestBody CartUpdateRequest cartUpdateRequest) {
        try {
            CartItem cartItem = iCartService.updateQuantityForItem(cartUpdateRequest);
            return ResponseEntity.ok(cartItem);
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
