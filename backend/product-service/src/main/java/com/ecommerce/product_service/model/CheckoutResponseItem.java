package com.ecommerce.product_service.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutResponseItem {
    private Long productId;
    private String productName;
    private Double totalPrice;
    private String imageUrl;
    private int quantity;
}
