package com.ecommerce.order_service.controller;

import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.enums.OrderStatus;
import com.ecommerce.order_service.model.*;
import com.ecommerce.order_service.service.OrderService;
import com.ecommerce.order_service.service.PaymentService;
import com.ecommerce.order_service.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestHeader(name = "Authorization") String token,
                                        @RequestBody PlaceOrderRequest placeOrderRequest) {
        try {
            Long userId = jwtUtil.extractUserId(token.substring(7));
            Order order = orderService.createOrder(userId, placeOrderRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error placing order: " + e.getMessage());
        }
    }

    @PutMapping("/cancel-order/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        // Logic to cancel the order
        try {
            // Assuming orderService has a method to cancel the order
            Order order = orderService.cancelOrder(orderId);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error cancelling order: " + e.getMessage());
        }
    }

    @GetMapping("/get-order/{orderId}")
    public ResponseEntity<?> getOrder(@PathVariable Long orderId) {
        // Logic to get the order details
        try {
            // Assuming orderService has a method to get the order details
            OrderResponse orderResponse = orderService.getOrderById(orderId);
            return ResponseEntity.ok(orderResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching order: " + e.getMessage());
        }
    }

    @GetMapping("/order-history")
    public ResponseEntity<?> getOrdersHistory(@RequestHeader(name = "Authorization")  String token,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "20") int size) {
        // Logic to get all orders
        try {
            Long userId = jwtUtil.extractUserId(token.substring(7));
            // Assuming orderService has a method to get all orders
            Page<OrderHistoryResponse> orderHistoryResponses = orderService.getAllOrders(userId, page, size);
            return ResponseEntity.ok(new OrderHistoryPageResponse<>(orderHistoryResponses));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching orders: " + e.getMessage());
        }
    }

    @PostMapping("/update-order/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@RequestHeader("Authorization") String token,
                                               @PathVariable Long orderId,
                                               @RequestParam(name = "orderStatus") OrderStatus orderStatus) {
        // Logic to update the order
        try {
            // Assuming orderService has a method to update the order
            Order order = orderService.updateOrderStatus(orderId, orderStatus, token.substring(7));
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating order: " + e.getMessage());
        }

    }
}
