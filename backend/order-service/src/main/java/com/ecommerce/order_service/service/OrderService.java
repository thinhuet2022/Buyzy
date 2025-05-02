package com.ecommerce.order_service.service;

import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.entity.OrderItems;
import com.ecommerce.order_service.entity.Payment;
import com.ecommerce.order_service.enums.OrderStatus;
import com.ecommerce.order_service.enums.PaymentMethod;
import com.ecommerce.order_service.enums.PaymentStatus;
import com.ecommerce.order_service.model.*;
import com.ecommerce.order_service.repository.OrderItemsRepository;
import com.ecommerce.order_service.repository.OrderRepository;
import com.ecommerce.order_service.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductServiceClient productServiceClient;

    
    public Order createOrder(Long userId, PlaceOrderRequest placeOrderRequest) {
        Order order = new Order();
        order.setUserId(userId);
        order.setTotalPrice(placeOrderRequest.getTotal());
        order.setStatus(OrderStatus.PENDING);
        String shippingAddress = placeOrderRequest.getAddress().getAddress() + ", " +
                placeOrderRequest.getAddress().getWard() + ", " +
                placeOrderRequest.getAddress().getDistrict() + ", " +
                placeOrderRequest.getAddress().getProvince();
        order.setShippingAddress(shippingAddress);

        order.setAdditionalInfo(placeOrderRequest.getAddress().getAdditionalInfo());
        order.setFullName(placeOrderRequest.getAddress().getFirstName() + " " + placeOrderRequest.getAddress().getLastName());

        order.setEmail(placeOrderRequest.getAddress().getEmail());

        order.setPhoneNumber(placeOrderRequest.getAddress().getPhoneNumber());


        List<OrderItems> orderItemsList = new ArrayList<>();
        for(OrderRequest orderRequest : placeOrderRequest.getOrderRequest()) {
            OrderItems orderItems = new OrderItems();
            orderItems.setOrder(order);
            orderItems.setProductId(orderRequest.getProductId());
            orderItems.setQuantity(orderRequest.getQuantity());
            orderItems.setPrice(orderRequest.getTotalPrice());
            orderItems.setImageUrl(orderRequest.getImageUrl());
            orderItems.setName(orderRequest.getProductName());
            orderItems.setVariantId(orderRequest.getVariantId());
            orderItems.setSku(orderRequest.getSku());

            orderItemsList.add(orderItems);
        }

        order.setOrderItems(orderItemsList);

        Payment payment = new Payment();
        payment.setUserId(userId);
        payment.setOrder(order);
        payment.setAmount(placeOrderRequest.getTotal());
        payment.setPaymentMethod(placeOrderRequest.getPaymentMethod());
        if(placeOrderRequest.getPaymentMethod() == PaymentMethod.CASH_ON_DELIVERY) {
            payment.setStatus(PaymentStatus.PENDING);
        } else {
            payment.setStatus(PaymentStatus.COMPLETED);
        }
        order.setPayment(payment);

        orderRepository.save(order);

        return order;
    }

    public Order cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return order;
    }

    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Payment payment = paymentRepository.findByOrderId(order.getId());
        List<OrderItems> orderItems = orderItemsRepository.findByOrderId(order.getId());
        return OrderResponse.builder()
                .orderId(order.getId())
                .orderStatus(order.getStatus())
                .shippingAddress(order.getShippingAddress())
                .orderDate(order.getCreatedAt().toString())
                .deliveryDate(order.getUpdatedAt().toString())
                .paymentMethod(payment.getPaymentMethod())
                .totalPrice(order.getTotalPrice())
                .orderItems(orderItems)
                .build();
    }

    public Page<OrderHistoryResponse> getAllOrders(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders = orderRepository.findByUserId(userId, pageable);
        return getOrderHistoryResponse(orders);
    }
    private Page<OrderHistoryResponse> getOrderHistoryResponse(Page<Order> orders) {
        return orders.map(this::fromOrderToOrderHistoryResponse);
    }

    private OrderHistoryResponse fromOrderToOrderHistoryResponse(Order order) {
        Payment payment = paymentRepository.findByOrderId(order.getId());
        return OrderHistoryResponse.builder().
                orderId(order.getId())
                .orderStatus(order.getStatus())
                .orderDate(order.getCreatedAt().toString())
                .deliveryDate(order.getUpdatedAt().toString())
                .quantity(order.getOrderItems().size())
                .paymentMethod(payment.getPaymentMethod())
                .totalPrice(order.getTotalPrice())
                .shippingAddress(order.getShippingAddress())
                .order(order)
                .build();

    }


    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus, String token) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if(orderStatus == OrderStatus.DELIVERED) {
            try{
                order.setUpdatedAt(java.time.LocalDateTime.now());

                OrderResponse orderResponse = getOrderById(orderId);
                List<OrderItems> orderItems = orderResponse.getOrderItems();
                List<InventoryUpdateRequest> inventoryUpdateRequests = new ArrayList<>();
                for (OrderItems orderItem : orderItems) {
                    InventoryUpdateRequest inventoryUpdateRequest = new InventoryUpdateRequest(
                            orderItem.getProductId(),
                            orderItem.getQuantity(),
                            orderItem.getVariantId()
                    );
                    inventoryUpdateRequests.add(inventoryUpdateRequest);
                }
                productServiceClient.updateInventory(inventoryUpdateRequests, token);
                return order;
            } catch (Exception e) {
                throw new RuntimeException("Failed to update order status and inventory", e);
            }

        }

        order.setStatus(orderStatus);
        orderRepository.save(order);
        return order;
    }
}
