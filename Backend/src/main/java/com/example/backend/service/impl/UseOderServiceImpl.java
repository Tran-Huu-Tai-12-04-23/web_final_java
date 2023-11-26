package com.example.backend.service.impl;

import com.example.backend.dto.OrderRequest;
import com.example.backend.exception.AlreadyExistException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.example.backend.service.IAccountService;
import com.example.backend.service.IUserOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UseOderServiceImpl implements IUserOrderService {

    private final AddressRepository addressRepository;
    private final MemberRepository memberRepository;
    private final OrderMemberRepository orderMemberRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CartService cartService;

    @Override

    public OrderMember addOrder(OrderRequest orderRequest) {
        OrderMember orderMember = new OrderMember();
        Optional<Member> memberOptional = memberRepository.findById(orderRequest.getMember().getId());

        if (memberOptional.isEmpty()) {
            throw new NotFoundException("Member not found");
        }

        Member memberOrder = memberOptional.get();

        orderMember.setMember(memberOrder);
        orderMember.setTotal(orderRequest.getTotal());
        // Assuming you have an 'address' property in OrderMember
        System.out.println(orderRequest.getAddress().getId());
        orderMember.setAddress(orderRequest.getAddress());
        // Assuming you have an 'amount' property in OrderMember
        orderMember.setAmount(orderRequest.getAmount());
        orderMember.setMethodPayment(orderRequest.getMethodPayment())   ;

        orderMember = orderMemberRepository.save(orderMember);

        final OrderMember finalOrderMember = orderMember;
        orderRequest.getProducts().forEach(pro -> {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProduct(pro);
            orderDetail.setSubAmount(pro.getQuantity());
            orderDetail.setSubTotal(pro.getPrice() * pro.getQuantity());
            orderDetail.setOrderMember(finalOrderMember);

            cartService.removeItemFromCart(memberOrder.getId(), pro.getId());
            orderDetailRepository.save(orderDetail);
        });

        return orderMemberRepository.findById(finalOrderMember.getId()).orElse(null);
    }
    @Override
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public Boolean removeAddress(Long addressId) {
        return addressRepository.removeAddressById(addressId);
    }
    @Override
    public Address updateAddress(Address address, Long id) {
        return addressRepository.findById(id).map( ad -> {
            ad.setAddress(address.getAddress());
            ad.setFullName(address.getFullName());
            ad.setDetailAddress(address.getDetailAddress());
            ad.setPhoneNumberTakeOrder(address.getPhoneNumberTakeOrder());
            return addressRepository.save(ad);
        }).orElseThrow(() -> new NotFoundException("Sorry, ths address could not be found"));

    }

    @Override
    public List<Address> getAllAddress(Long accountId) {
        return addressRepository.findAllByAccountId(accountId);
    }

    @Override
    public Address getAddress(Long addressId) {
        return addressRepository.getAddressById(addressId);
    }

    @Override
    public Address setAddressIsDefault(Address address) {
        Long accountId = address.getAccount().getId();
        // Find all addresses for the account
        List<Address> accountAddresses = addressRepository.findAllByAccountId(accountId);
        // Set isDefault to false for all addresses
        accountAddresses.forEach(ad -> ad.setIsDefault(false));
        // Find the address to be updated
        Address addressToUpdate = accountAddresses.stream()
                .filter(ad -> Objects.equals(ad.getId(), address.getId()))
                .findAny()
                .orElseThrow(() -> new NotFoundException("Sorry, this address could not be found"));


        // Update the address fields
        addressToUpdate.setAddress(address.getAddress());
        addressToUpdate.setFullName(address.getFullName());
        addressToUpdate.setDetailAddress(address.getDetailAddress());
        addressToUpdate.setPhoneNumberTakeOrder(address.getPhoneNumberTakeOrder());
        addressToUpdate.setIsDefault(true);
        addressRepository.saveAll(accountAddresses);
        // Save the updated addresses
        return addressToUpdate;
    }

    @Override
    public Address getAddressIsDefault(Long accountId) {
        return addressRepository.getAddressByAccountIdAndIsDefaultTrue(accountId);
    }


}
