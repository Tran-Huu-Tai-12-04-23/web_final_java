package com.example.backend.service.impl;

import com.example.backend.exception.AlreadyExistException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Account;
import com.example.backend.model.Cart;
import com.example.backend.model.Member;
import com.example.backend.model.Product;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.IAccountService;
import com.example.backend.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {
    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;


    @Override
    public Cart createNew(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart removeItem(Long idProduct) {
        return null;
    }

    @Override
    public Cart getCartByMember(Member member) {
        return null;
    }

    @Override
    public Product addToCart(Long productId, Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);

        if( member.isEmpty()) throw  new RuntimeException("Member not found");

        Optional<Product> pro = productRepository.findById(productId);

        if( pro.isEmpty()) throw  new RuntimeException("product not found");

        Cart cart = cartRepository.findByMember(member.get());
        List<Product> listPro = new ArrayList<>();
        if( cart == null ) {
            Cart newCart = new Cart();
            listPro.add(pro.get());
            newCart.setMember(member.get());
            newCart.setProducts(listPro);
            cart = this.createNew(newCart);
            return pro.get();
        }
        listPro = cart.getProducts();
        if (!listPro.contains(pro.get())) {
            listPro.add(pro.get());
            cart.setProducts(listPro);
            cartRepository.save(cart);
        }
        return pro.get();
    }

    @Override
    public Cart getDetailCartByMember(Long memberId) {
        Member member = new Member();
        member.setId(memberId);
        Cart cart = cartRepository.findByMember(member);

        if( cart == null ) {
            cart = new Cart();
            cart.setMember(member);
            return cart;
        }

        return cart;
    }

    @Override
    public int countItemCart(Long mId) {
        Member member = new Member();
        member.setId(mId);
        Cart cart = cartRepository.findByMember(member);
        if( cart == null ) {
            return 0;
        }
        return cart.getProducts().size();
    }

    public Cart removeItemFromCart(Long memberId, Long proId) {
        Member member = new Member();
        member.setId(memberId);
        Cart cart = cartRepository.findByMember(member);

        if (cart == null) {
            throw new RuntimeException("Cart is empty");
        }

        List<Product> proList = cart.getProducts();

        proList.removeIf(product -> product.getId().equals(proId));

        return cartRepository.save(cart);
    }
}
