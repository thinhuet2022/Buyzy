package com.ecommerce.product_service.controller;

import com.ecommerce.product_service.model.AddToCartRequest;
import com.ecommerce.product_service.model.CheckoutItemRequest;
import com.ecommerce.product_service.service.CartService;
import com.ecommerce.product_service.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/items")
    public ResponseEntity<?> getCartItems(@RequestHeader("Authorization") String token) {
        Long userId = jwtUtil.extractUserId(token.substring(7));
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @GetMapping("/cart-size")
    public ResponseEntity<?> getCart(@RequestHeader("Authorization") String token) {
        Long userId = jwtUtil.extractUserId(token.substring(7));
        return ResponseEntity.ok(cartService.getCartSize(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestHeader("Authorization") String token,
                                        @RequestBody AddToCartRequest addToCartRequest) throws Exception {
        Long userId = jwtUtil.extractUserId(token.substring(7));
        System.out.println("User ID: " + userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addToCart(userId, addToCartRequest));
    }
    @PutMapping("/remove/{cartItemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long cartItemId, @RequestHeader ("Authorization") String token) {
        Long userId = jwtUtil.extractUserId(token.substring(7));
        Long cartId = cartService.getCartId(userId);
        return ResponseEntity.ok(cartService.removeFromCart(cartId, cartItemId));
    }
    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long cartItemId,
                                            @RequestParam("quantity") Integer quantity) {
        return ResponseEntity.ok(cartService.updateCartItem(cartItemId, quantity));
    }
    @PutMapping("/clear")
    public ResponseEntity<?> clearCart(@RequestHeader("Authorization") String token) {
        Long userId = jwtUtil.extractUserId(token.substring(7));
        return ResponseEntity.ok(cartService.clearCart(userId));
    }
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody List<CheckoutItemRequest> checkoutItemRequests) {
        return ResponseEntity.ok(cartService.checkout(checkoutItemRequests));
    }
}
