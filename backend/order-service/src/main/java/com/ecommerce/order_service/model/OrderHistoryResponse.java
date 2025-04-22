package com.ecommerce.order_service.model;

import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.enums.OrderStatus;
import com.ecommerce.order_service.enums.PaymentMethod;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderHistoryResponse {

    private Long orderId;
    private String orderDate;
    private String deliveryDate;
    private OrderStatus orderStatus;
    private double totalPrice;
    private String shippingAddress;
    private PaymentMethod paymentMethod;
    private Integer quantity;
    private Order order;
}
