package com.example.backend.service;

import com.example.backend.dto.OrderRequest;
import com.example.backend.model.Address;
import com.example.backend.model.Blog;
import com.example.backend.model.CategoryBlog;
import com.example.backend.model.OrderMember;
import org.springframework.core.annotation.Order;

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
    OrderMember addOrder(OrderRequest orderRequest);

}
