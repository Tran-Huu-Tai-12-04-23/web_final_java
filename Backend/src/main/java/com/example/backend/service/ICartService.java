package com.example.backend.service;

import com.example.backend.model.Cart;
import com.example.backend.model.Member;
import com.example.backend.model.Product;
import com.example.backend.model.Question;

import java.util.List;
import java.util.Optional;

public interface ICartService {
    Cart createNew(Cart cart);
    Cart removeItem(Long idProduct);
    Cart getCartByMember(Member member);

    Product addToCart(Long productId, Long memberId);

    Cart getDetailCartByMember(Long memberId);
    int countItemCart(Long mId);
    Cart removeItemFromCart(Long memberId, Long proId);

}

