package com.ecommerce.product_service.controller;

import com.ecommerce.product_service.model.CheckoutRequestItem;
import com.ecommerce.product_service.service.CartService;
import com.ecommerce.product_service.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addToCart(@RequestHeader("Authorization") String token,
                                        @PathVariable Long productId,
                                       @RequestParam(defaultValue = "1") Integer quantity) throws Exception {
        Long userId = jwtUtil.extractUserId(token.substring(7));
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }
    @PutMapping("/remove/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeFromCart(productId));
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
    @GetMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody List<CheckoutRequestItem> checkoutRequestItems) {
        return ResponseEntity.ok(cartService.checkout(checkoutRequestItems));
    }
}
