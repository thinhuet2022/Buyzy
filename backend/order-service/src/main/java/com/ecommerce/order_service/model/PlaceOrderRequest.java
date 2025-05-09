package com.ecommerce.order_service.model;

import com.ecommerce.order_service.enums.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class PlaceOrderRequest {
    private List<OrderRequest> orderRequest;
    private ShippingAddress address;
    private PaymentMethod paymentMethod;
    private Double total;
}
