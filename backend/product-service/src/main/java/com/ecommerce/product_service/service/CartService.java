package com.ecommerce.product_service.service;

import com.ecommerce.product_service.entity.CartItem;
import com.ecommerce.product_service.entity.Product;
import com.ecommerce.product_service.model.CheckoutRequestItem;
import com.ecommerce.product_service.model.CheckoutResponseItem;
import com.ecommerce.product_service.repository.CartItemRepository;
import com.ecommerce.product_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartItem> getCartItems(Long userId) {
        // Logic to retrieve cart items

        return cartItemRepository.findAllByUserId(userId);
    }

    public CartItem addToCart(Long userId, Long productId, Integer quantity) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new Exception("Product not found"));

        Optional<CartItem> existing = cartItemRepository.findByUserIdAndProductId(userId, productId);

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            item.setTotalPrice(product.getPrice() * item.getQuantity());
            return cartItemRepository.save(item);
        }

        else {
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setUserId(userId);
            newItem.setTotalPrice(product.getPrice() * quantity);
            // Nếu cần, setCart() ở đây

            return cartItemRepository.save(newItem);
        }

    }

    public CartItem removeFromCart(Long productId) {
        // Logic to remove a cart item
        CartItem cartItem = cartItemRepository.findById(productId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItemRepository.deleteById(productId);
        return cartItem;
    }

    public CartItem updateCartItem(Long cartItemId, Integer quantity) {
        // Logic to update a cart item
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        Product product = cartItem.getProduct();
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(product.getPrice() * quantity);
        cartItemRepository.save(cartItem);
        return cartItem;
    }

    public String clearCart(Long userId) {
        // Logic to clear the cart
        try {
            List<CartItem> cartItems = cartItemRepository.findAllByUserId(userId);
            cartItemRepository.deleteAll(cartItems);
            return "Cart items have been cleared";
        } catch (Exception e) {
            throw new RuntimeException("Failed to clear cart", e);
        }
    }

    public List<CheckoutResponseItem> checkout(List<CheckoutRequestItem> checkoutRequestItems) {

        // Logic to checkout
        List<CheckoutResponseItem> checkoutResponseItems = new ArrayList<>();
        for( CheckoutRequestItem item : checkoutRequestItems) {
            CheckoutResponseItem checkoutResponseItem = new CheckoutResponseItem();
            CartItem cartItem = cartItemRepository.findById(item.getCartItemId()).orElseThrow(() -> new RuntimeException("Cart item not found"));
            Product product = productRepository.findById(item.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

            if (cartItem.getQuantity() > product.getStock()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
            checkoutResponseItem.setProductId(product.getId());
            checkoutResponseItem.setProductName(product.getName());
            checkoutResponseItem.setQuantity(cartItem.getQuantity());
            checkoutResponseItem.setTotalPrice(cartItem.getTotalPrice());
            checkoutResponseItem.setImageUrl(product.getImageUrls().getFirst());
            checkoutResponseItems.add(checkoutResponseItem);
            // Update product stock
        }
        return checkoutResponseItems;
    }
}