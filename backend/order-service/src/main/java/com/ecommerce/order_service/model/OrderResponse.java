package com.ecommerce.order_service.model;

import com.ecommerce.order_service.entity.OrderItems;
import com.ecommerce.order_service.enums.OrderStatus;
import com.ecommerce.order_service.enums.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class OrderResponse {
    private Long orderId;
    private List<OrderItems> orderItems;
    private OrderStatus orderStatus;
    private String shippingAddress;
    private String orderDate;
    private String deliveryDate;
    private PaymentMethod paymentMethod;
    private double totalPrice;
}
