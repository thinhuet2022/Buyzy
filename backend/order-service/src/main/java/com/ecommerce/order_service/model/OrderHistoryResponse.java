package com.ecommerce.order_service.model;

import com.ecommerce.order_service.enums.OrderStatus;
import com.ecommerce.order_service.enums.PaymentMethod;
import lombok.Data;

@Data
public class OrderHistoryResponse {

    private Long orderId;
    private String orderDate;
    private String deliveryDate;
    private OrderStatus orderStatus;
    private double totalPrice;
    private String shippingAddress;
    private PaymentMethod paymentMethod;
}
