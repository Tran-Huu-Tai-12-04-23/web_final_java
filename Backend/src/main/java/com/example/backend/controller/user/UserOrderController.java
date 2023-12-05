package com.example.backend.controller.user;

import com.example.backend.dto.CartRequest;
import com.example.backend.dto.OrderRequest;
import com.example.backend.model.*;
import com.example.backend.service.IAccountService;
import com.example.backend.service.ICartService;
import com.example.backend.service.IUserOrderService;
import com.example.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user/order")
@RequiredArgsConstructor
public class UserOrderController {
    private final IUserOrderService iUserOrderService;
    private final IAccountService iAccountService;

    @PutMapping("/cancel-order/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        try {

            OrderMember orderMembers = iUserOrderService.cancelOrder(orderId);
            return ResponseEntity.ok(orderMembers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/detail-order/{orderId}")
    public ResponseEntity<?> getDetailOrder(@PathVariable Long orderId) {
        try {

            OrderMember orderMembers = iUserOrderService.getDetailOrder(orderId);
            return ResponseEntity.ok(orderMembers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all/{mId}")
    public ResponseEntity<?> getOrderByMember(@PathVariable Long mId) {
        try {

            List<OrderMember> orderMembers = iUserOrderService.getAllOrderByMemberId(mId);
            return ResponseEntity.ok(orderMembers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/add-order")
    public ResponseEntity<?> addOrder(@RequestBody OrderRequest orderRequest) {
        try {
            Utils.validateOrderRequest(orderRequest);

            OrderMember orderMember = iUserOrderService.addOrder(orderRequest);

            if(orderMember == null) {
                return ResponseEntity.badRequest().body("Failed to add order.");
            }else {
                return ResponseEntity.ok(orderMember);

            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/address")
    public ResponseEntity<?> addAddress(@RequestBody Address address) {
        try {
            System.out.println(address.getAccount().getId());
            Optional<Account> account = iAccountService.getAccount(address.getAccount().getId());

            if(account.isPresent()) {
                Account ac = account.get();
                address.setAccount(ac);
                address.setIsDefault(false);
                Address addressResult = iUserOrderService.createAddress(address);
                return ResponseEntity.ok(addressResult);
            }else {
                return ResponseEntity.badRequest().body("Failed to add address.");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add address.");
        }
    }
    @PutMapping("/address/set-default")
    public ResponseEntity<?> setDefaultAddress(@RequestBody Address address) {
        try {
            Address addressResult = iUserOrderService.setAddressIsDefault(address);
            return ResponseEntity.ok(addressResult);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add address.");
        }
    }
    @GetMapping("/address/default-address")
    public ResponseEntity<?> getDefaultAddress(@RequestParam Long accountId) {
        try {
            System.out.println(accountId);
            Address addressResult = iUserOrderService.getAddressIsDefault(accountId);
            return ResponseEntity.ok(addressResult);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add address.");
        }
    }
    @PutMapping("/address/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Long id, @RequestBody Address address) {
        try {
            Address updatedAddress = iUserOrderService.updateAddress(address, id);
            if (updatedAddress != null) {
                return ResponseEntity.ok(updatedAddress);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update address.");
        }
    }
    @DeleteMapping("/address/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        try {
            boolean isResult = iUserOrderService.removeAddress(id);
            return isResult ? ResponseEntity.ok("Address deleted successfully.") :   ResponseEntity.badRequest().body("Failed to delete address.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Failed to delete address.");
        }
    }

    @GetMapping("/address/{id}")
    public ResponseEntity<?> getAddressDetail(@PathVariable Long id) {
        try {
            boolean isResult = iUserOrderService.removeAddress(id);
            return isResult ? ResponseEntity.ok("Address deleted successfully.") :   ResponseEntity.badRequest().body("Failed to delete address.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete address.");
        }
    }

    @GetMapping("/address")
    public ResponseEntity<?> getAllAddress(@RequestParam Long accountId) {
        try {
            List<Address> listAdd = iUserOrderService.getAllAddress(accountId);
            return ResponseEntity.ok(listAdd);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete address.");
        }
    }






}
