package com.example.backend.service.impl;

import com.example.backend.dto.EmailRequest;
import com.example.backend.dto.OrderRequest;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.example.backend.service.IEmailService;
import com.example.backend.service.IUserOrderService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UseOderService implements IUserOrderService {

    private final AddressRepository addressRepository;
    private final MemberRepository memberRepository;
    private final OrderMemberRepository orderMemberRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final VoteRepository voteRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;
    private final TemplateEngine templateEngine;
    private final IEmailService iEmailService;

    @Override

    public OrderMember addOrder(OrderRequest orderRequest) throws MessagingException {
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
        Optional<Address> addressOptional = addressRepository.findById(orderRequest.getAddress().getId());
        if(addressOptional.isEmpty())  throw new NotFoundException("address not found");
        Address address = addressOptional.get();
        orderMember.setAddress(address.getAddress());
        orderMember.setFullName(address.getFullName());
        orderMember.setPhoneNumberTakeOrder(address.getPhoneNumberTakeOrder());
        orderMember.setDetailAddress(address.getDetailAddress());
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
            Optional<Product> productOptional = productRepository.findById(pro.getId());
            if( productOptional.isEmpty()) throw  new NotFoundException("Product not found!");

            Product product = productOptional.get();
            product.setQuantity(product.getQuantity() - pro.getQuantity());

            cartService.removeItemFromCart(memberOrder.getId(), pro.getId());
            orderDetailRepository.save(orderDetail);
        });

        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setEmail(memberOrder.getEmail());
        emailRequest.setSubject("Cảm ơn quý khách đã đặt hàng!");
        Context context = new Context();
        String htmlContent = templateEngine.process("orderComplete", context);
        emailRequest.setContent(htmlContent);
        iEmailService.sendMail(emailRequest);

        return orderMemberRepository.findById(finalOrderMember.getId())
                .orElseThrow(() -> new RuntimeException("Order failed!"));
    }

    @Override
    public List<OrderMember> getAllOrderByMemberId(Long mId) {

        return orderMemberRepository.findByMember_IdOrderByOrderDateDesc(mId);
    }

    @Override
    public OrderMember getDetailOrder(Long orderId) {
        Optional<OrderMember> orderMemberOp = orderMemberRepository.findById(orderId);

        return orderMemberOp.orElseThrow(() -> new NotFoundException("Order not found!"));
    }

    @Override
    public OrderMember cancelOrder(Long orderId) {
        Optional<OrderMember> orderMemberOptional = orderMemberRepository.findById(orderId);

        if( orderMemberOptional.isEmpty() ) throw new NotFoundException("Order not found!");

        OrderMember orderMember = orderMemberOptional.get();
        List<OrderDetail> orderDetailList = orderMember.getOrderDetails();

        for( OrderDetail orderDetail : orderDetailList ) {
            Product product = orderDetail.getProduct();
            int subAmount = orderDetail.getSubAmount();
            product.setQuantity(product.getQuantity() + subAmount);
            productRepository.save(product);
        }
        orderMember.setIsCancel(true);
        orderMember.setStepOrder(4);
        orderMember.setOrderStatus(OrderStatus.CANCEL);

        return orderMemberRepository.save(orderMember);
    }

    @Override
    public OrderMember changeStepOrder(Long orderId, Integer stepOrder) {
        Optional<OrderMember> orderOp = orderMemberRepository.findById(orderId);
        if(orderOp.isEmpty()) throw new NotFoundException("Order not found!");

        OrderMember orderMember = orderOp.get();
        orderMember.setStepOrder(stepOrder);
        orderMember.setIsCancel(stepOrder == 3);
        switch (stepOrder) {
            case 0 -> {
                orderMember.setOrderStatus(OrderStatus.PENDING);
            }
            case 1 -> {
                orderMember.setOrderStatus(OrderStatus.DELIVERY);
            }
            case 2 -> {
                orderMember.setOrderStatus(OrderStatus.DONE);
            }
            case 3 -> {
                orderMember.setOrderStatus(OrderStatus.CANCEL);
            }
            default -> {
                orderMember.setOrderStatus(OrderStatus.RETURN);
            }
        }
        return orderMemberRepository.save(orderMember);
    }

    @Override
    public OrderMember voteOrder(Long orderId, ReviewOrder reviewOrder) {
        Optional<OrderMember> orderMemberOptional = orderMemberRepository.findById(orderId);
        if (orderMemberOptional.isEmpty()) {
            throw new NotFoundException("Order not found!");
        }

        OrderMember orderMember = orderMemberOptional.get();
        List<OrderDetail> orderDetails = orderMember.getOrderDetails();

        for (OrderDetail orderDetail : orderDetails) {
            Product product = orderDetail.getProduct();
            List<ReviewOrder> reviewOrders = product.getReviewOrders();

            ReviewOrder newReviewOrder = new ReviewOrder();
            newReviewOrder.setMember(orderMember.getMember());
            newReviewOrder.setProduct(orderDetail.getProduct());
            newReviewOrder.setCreateAt(new Date());
            newReviewOrder.setStar(reviewOrder.getStar());
            newReviewOrder.setContent(reviewOrder.getContent());

            newReviewOrder = voteRepository.save(newReviewOrder);

            reviewOrders.add(newReviewOrder);
            product.setReviewOrders(reviewOrders);
            productRepository.save(product);
        }

        orderMember.setIsVote(true);
        return orderMemberRepository.save(orderMember);
    }



    @Override
    public List<OrderMember> search(String key, Integer stepOrder, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "orderDate"));

        return orderMemberRepository.search(key, stepOrder, pageable);
    }

    @Override
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    @Override
    @Transactional
    public Boolean removeAddress(Long addressId) {
        Optional<Address> addressOptional = addressRepository.findById(addressId);

        if (addressOptional.isEmpty()) {
            return false;
        }

        Address address = addressOptional.get();
//
        if (address.getIsDefault()) {
            List<Address> addressList = addressRepository.findAllByAccountId(address.getAccount().getId());

            List<Address> filteredAddresses = addressList.stream()
                    .filter(ad -> !Objects.equals(ad.getId(), addressId))
                    .toList();

            if (!filteredAddresses.isEmpty()) {
                Address newDefaultAddress = filteredAddresses.get(0);
                setAddressIsDefault(newDefaultAddress);
            }
        }
//
        addressRepository.removeById(addressId);
        return true;
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
