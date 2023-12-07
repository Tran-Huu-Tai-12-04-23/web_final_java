package com.example.backend.service;

import com.example.backend.dto.OrderRequest;
import com.example.backend.model.*;
import jakarta.mail.MessagingException;
import org.springframework.core.annotation.Order;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IUserOrderService {
    Address createAddress(Address address);
    Boolean removeAddress(Long addressId);
    Address updateAddress(Address address, Long id);
    List<Address> getAllAddress(Long accountId);
    Address getAddress(Long addressId);
    Address setAddressIsDefault(Address address);
    Address getAddressIsDefault(Long accountId);
    OrderMember addOrder(OrderRequest orderRequest) throws MessagingException;
    List<OrderMember> getAllOrderByMemberId(Long mId);
    OrderMember getDetailOrder(Long orderId);
    OrderMember cancelOrder(Long orderId);
    OrderMember changeStepOrder(Long orderId, Integer stepOrder);
    OrderMember changePaymentStatus(Long orderId);
    OrderMember voteOrder(Long orderId, ReviewOrder reviewOrder);
    List<OrderMember> search(String key, Integer stepOrder,Integer page, Integer size);

    Double calculatorRevenue();

}
