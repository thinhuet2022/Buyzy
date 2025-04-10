package com.ecommerce.order_service.service;

import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.entity.OrderItems;
import com.ecommerce.order_service.entity.Payment;
import com.ecommerce.order_service.enums.OrderStatus;
import com.ecommerce.order_service.model.OrderHistoryResponse;
import com.ecommerce.order_service.model.OrderRequest;
import com.ecommerce.order_service.model.OrderResponse;
import com.ecommerce.order_service.model.PlaceOrderRequest;
import com.ecommerce.order_service.repository.OrderItemsRepository;
import com.ecommerce.order_service.repository.OrderRepository;
import com.ecommerce.order_service.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private PaymentRepository paymentRepository;


    public Order createOrder(Long userId, PlaceOrderRequest placeOrderRequest) {
        Order order = new Order();
        order.setUserId(userId);
        double totalPrice = 0.0;
        for (OrderRequest orderRequest : placeOrderRequest.getOrderRequest()) {
            totalPrice += orderRequest.getPrice() * orderRequest.getQuantity();
        }
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);
        order.setShippingAddress(placeOrderRequest.getAddress());

        orderRepository.save(order);

        for(OrderRequest orderRequest : placeOrderRequest.getOrderRequest()) {
            OrderItems orderItems = new OrderItems();
            orderItems.setOrder(order);
            orderItems.setProductId(orderRequest.getProductId());
            orderItems.setQuantity(orderRequest.getQuantity());
            orderItems.setPrice(orderRequest.getPrice());
            orderItems.setImageUrl(orderRequest.getImageUrl());
            orderItems.setDescription(orderRequest.getDescription());

            orderItemsRepository.save(orderItems);
        }

        Payment payment = new Payment();
        payment.setUserId(userId);
        payment.setOrder(order);
        payment.setAmount(totalPrice);
        payment.setPaymentMethod(placeOrderRequest.getPaymentMethod());

        paymentRepository.save(payment);
        return order;
    }

    public Order cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return order;
    }

    public OrderResponse getOrderById(String orderId) {
        Order order = orderRepository.findById(Long.parseLong(orderId))
                .orElseThrow(() -> new RuntimeException("Order not found"));
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setOrderId(order.getId());
        orderResponse.setOrderStatus(order.getStatus());
        orderResponse.setShippingAddress(order.getShippingAddress());
        orderResponse.setOrderDate(order.getCreatedAt().toString());
        orderResponse.setDeliveryDate(order.getUpdatedAt().toString());

        Payment payment = paymentRepository.findByOrderId(order.getId());
        orderResponse.setPaymentMethod(payment.getPaymentMethod());

        orderResponse.setTotalPrice(order.getTotalPrice());

        List<OrderItems> orderItems = orderItemsRepository.findByOrderId(order.getId());
        orderResponse.setOrderItems(orderItems);

        return orderResponse;
    }

    public List<OrderHistoryResponse> getAllOrders(Long userId) {
        List<OrderHistoryResponse> orderHistoryResponses = new ArrayList<>();
        List<Order> orders = orderRepository.findByUserId(userId);
        for (Order order : orders) {
            OrderHistoryResponse orderHistoryResponse = new OrderHistoryResponse();
            orderHistoryResponse.setOrderId(order.getId());
            orderHistoryResponse.setOrderStatus(order.getStatus());
            orderHistoryResponse.setOrderDate(order.getCreatedAt().toString());
            orderHistoryResponse.setDeliveryDate(order.getUpdatedAt().toString());
            Payment payment = paymentRepository.findByOrderId(order.getId());
            orderHistoryResponse.setPaymentMethod(payment.getPaymentMethod());
            orderHistoryResponse.setTotalPrice(order.getTotalPrice());
            orderHistoryResponse.setShippingAddress(order.getShippingAddress());

            orderHistoryResponses.add(orderHistoryResponse);
        }
        return orderHistoryResponses;
    }

    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(orderStatus);
        orderRepository.save(order);
        return order;
    }
}
