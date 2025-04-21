package com.ecommerce.product_service.service;

import com.ecommerce.product_service.entity.*;
import com.ecommerce.product_service.model.AddToCartRequest;
import com.ecommerce.product_service.model.CartItemResponse;
import com.ecommerce.product_service.model.CheckoutItemRequest;
import com.ecommerce.product_service.model.CheckoutItemResponse;
import com.ecommerce.product_service.repository.CartItemRepository;
import com.ecommerce.product_service.repository.CartRepository;
import com.ecommerce.product_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    public List<CartItemResponse> getCartItems(Long userId) {
        // Logic to retrieve cart items
        List<CartItem> cartItems =  cartItemRepository.findAllByUserId(userId);

        List<CartItemResponse> cartItemResponses = new ArrayList<>();

        for(CartItem cartItem : cartItems) {
            CartItemResponse cartItemResponse = getCartItemResponse(cartItem);
            cartItemResponses.add(cartItemResponse);
        }
        return cartItemResponses;
    }

    private static CartItemResponse getCartItemResponse(CartItem cartItem) {
        CartItemResponse cartItemResponse = new CartItemResponse();
        cartItemResponse.setId(cartItem.getId());
        cartItemResponse.setQuantity(cartItem.getQuantity());
        cartItemResponse.setPrice(cartItem.getPrice());
        cartItemResponse.setProductId(cartItem.getProduct().getId());
        cartItemResponse.setProductName(cartItem.getProduct().getName());
        String imageUrl = null;
        for(ProductImages image : cartItem.getProduct().getImageUrls()){
            if(!Objects.equals(image.getImageUrl(), imageUrl)){
                imageUrl = image.getImageUrl();
                break;
            }
        }
        cartItemResponse.setProductImage(imageUrl);
        cartItemResponse.setSku(cartItem.getSku());
        return cartItemResponse;
    }

    public CartItem addToCart(Long userId, AddToCartRequest addToCartRequest) throws Exception {
        Product product = productRepository.findById(addToCartRequest.getProductId())
                .orElseThrow(() -> new Exception("Product not found"));

        if(addToCartRequest.getSelectedVariantId() == null && addToCartRequest.getSku() == null){
            for(Variant variant : product.getVariant()){
                if(variant.getStock() > 0) {
                    addToCartRequest.setSelectedVariantId(variant.getId());
                    StringBuilder sku = new StringBuilder();
                    for(VariantOptions variantOptions : variant.getVariantOptions()){
                        sku.append(variantOptions.getOptionValue()).append("-");
                    }
                    sku.deleteCharAt(sku.length() - 1);
                    addToCartRequest.setSku(sku.toString());
                    break;
                }
            }
            addToCartRequest.setSelectedVariantId(product.getVariant().getFirst().getId());
        }
        Optional<CartItem> existing = cartItemRepository.findByUserIdAndVariantId(userId, addToCartRequest.getSelectedVariantId());

        Optional<Cart> cart = cartRepository.findByUserId(userId);

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + addToCartRequest.getQuantity());
            item.setPrice(product.getPrice() * item.getQuantity());
            cart.ifPresent(value -> value.setTotalPrice(value.getTotalPrice() + (product.getPrice() * addToCartRequest.getQuantity())));
            return cartItemRepository.save(item);
        }

        else {
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setQuantity(addToCartRequest.getQuantity());
            newItem.setUserId(userId);
            newItem.setPrice(product.getPrice() * addToCartRequest.getQuantity());
            newItem.setVariantId(addToCartRequest.getSelectedVariantId());
            newItem.setSku(addToCartRequest.getSku());
            if (cart.isPresent()) {
                newItem.setCart(cart.get());
                cart.get().setTotalPrice(cart.get().getTotalPrice() + (product.getPrice() * addToCartRequest.getQuantity()));
            } else {
                Cart newCart = new Cart();
                newCart.setUserId(userId);
                newCart.setTotalPrice(newItem.getPrice());
                ArrayList <CartItem> items = new ArrayList<>();
                items.add(newItem);
                newCart.setItems(items);

                cartRepository.save(newCart);
                newItem.setCart(newCart);
            }

            return cartItemRepository.save(newItem);
        }

    }

    public CartItem removeFromCart(Long cartId, Long cartItemId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem toRemove = cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cart.getItems().remove(toRemove); // orphanRemoval sẽ tự xoá khỏi DB
        cartRepository.save(cart); // cần save để flush thay đổi xuống DB

        return toRemove;
    }

    public CartItem updateCartItem(Long cartItemId, Integer quantity) {
        // Logic to update a cart item
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        Product product = cartItem.getProduct();
        cartItem.setQuantity(quantity);
        cartItem.setPrice(product.getPrice() * quantity);
        cartItemRepository.save(cartItem);
        return cartItem;
    }

    public String clearCart(Long userId) {
        // Logic to clear the cart
        try {
            List<CartItem> cartItems = cartItemRepository.findAllByUserId(userId);
            Cart cart = cartRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Cart not found"));
            cart.getItems().clear();
            cart.setTotalPrice(0.0);
            cartRepository.save(cart);
            return "Cart items have been cleared";
        } catch (Exception e) {
            throw new RuntimeException("Failed to clear cart", e);
        }
    }

    public List<CheckoutItemResponse> checkout(List<CheckoutItemRequest> checkoutItemRequests) {

        // Logic to checkout
        List<CheckoutItemResponse> checkoutResponseItems = new ArrayList<>();
        for( CheckoutItemRequest item : checkoutItemRequests) {
            CheckoutItemResponse checkoutResponseItem = new CheckoutItemResponse();
            CartItem cartItem = cartItemRepository.findById(item.getCartItemId()).orElseThrow(() -> new RuntimeException("Cart item not found"));
            Product product = productRepository.findById(item.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));

            if (cartItem.getQuantity() > product.getStock()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
            checkoutResponseItem.setProductId(product.getId());
            checkoutResponseItem.setProductName(product.getName());
            checkoutResponseItem.setQuantity(cartItem.getQuantity());
            checkoutResponseItem.setTotalPrice(cartItem.getPrice());
            checkoutResponseItem.setVariantId(cartItem.getVariantId());
            String imageUrl = null;
            for(ProductImages image : cartItem.getProduct().getImageUrls()){
                if(!Objects.equals(image.getImageUrl(), imageUrl)){
                    imageUrl = image.getImageUrl();
                    break;
                }
            }
            checkoutResponseItem.setImageUrl(imageUrl);
            checkoutResponseItem.setSku(cartItem.getSku());

            checkoutResponseItems.add(checkoutResponseItem);
            // Update product stock
        }
        return checkoutResponseItems;
    }

    public Long getCartId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        return cart.getId();
    }

    public Long getCartSize(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        return (long) cart.getItems().size();
    }
}