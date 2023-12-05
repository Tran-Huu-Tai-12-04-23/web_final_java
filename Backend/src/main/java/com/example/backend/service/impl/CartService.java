package com.example.backend.service.impl;

<<<<<<< HEAD
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
=======
import com.example.backend.dto.CartUpdateRequest;
import com.example.backend.exception.AlreadyExistException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.model.*;
import com.example.backend.repository.*;
>>>>>>> main
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
<<<<<<< HEAD
=======
    private final CartItemRepository cartItemRepository;
>>>>>>> main


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
<<<<<<< HEAD
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
=======
        // Find member by ID
        Optional<Member> memberOptional = memberRepository.findById(memberId);

        if (memberOptional.isEmpty()) {
            throw new RuntimeException("Member not found");
        }
        // Find product by ID
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product not found");
        }
        // Find or create a cart for the member
        Member member = memberOptional.get();
        Cart cart = cartRepository.findByMember(member);
        if (cart == null) {
            cart = new Cart();
            cart.setMember(member);
            cart.setCartItems(new ArrayList<>());
        }
        // Check if the product is already in the cart
        Product product = productOptional.get();
        List<CartItem> cartItems = cart.getCartItems();
        Optional<CartItem> existingCartItem = cartItems.stream()
                .filter(item -> item.getProduct().equals(product))
                .findFirst();

        if (existingCartItem.isPresent()) {
            // If the product is already in the cart, update the quantity
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartItemRepository.save(cartItem);
        } else {
            // If the product is not in the cart, add a new cart item
            CartItem newCartItem = new CartItem();
            newCartItem.setProduct(product);
            newCartItem.setQuantity(1);
            newCartItem.setCart(cart);
            cartItems.add(newCartItem);
            cartRepository.save(cart);
        }
        return product;
>>>>>>> main
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
<<<<<<< HEAD
        return cart.getProducts().size();
=======
        return cart.getCartItems().size();
>>>>>>> main
    }

    public Cart removeItemFromCart(Long memberId, Long proId) {
        Member member = new Member();
        member.setId(memberId);
        Cart cart = cartRepository.findByMember(member);

        if (cart == null) {
            throw new RuntimeException("Cart is empty");
        }

<<<<<<< HEAD
        List<Product> proList = cart.getProducts();

        proList.removeIf(product -> product.getId().equals(proId));

        return cartRepository.save(cart);
    }
=======
        List<CartItem> cartItems = cart.getCartItems();

        cartItems.removeIf(cartItem -> cartItem.getProduct().getId().equals(proId));

        return cartRepository.save(cart);
    }

    @Override
    public CartItem updateQuantityForItem(CartUpdateRequest cartUpdateRequest) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartUpdateRequest.getCartItemId());
        if( cartItemOptional.isEmpty()) throw new NotFoundException("Cart item not found");
        CartItem cartItem = cartItemOptional.get();
        Product product = cartItem.getProduct();

        if( cartUpdateRequest.getQuantity() < product.getQuantity()) {

            cartItem.setQuantity(cartUpdateRequest.getQuantity());

            return cartItemRepository.save(cartItem);
        }

        throw new RuntimeException("Product is not enough!");

    }
>>>>>>> main
}
