package com.ecommerce.product_service.model;

import com.ecommerce.product_service.entity.Variant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutItemResponse {
    private Long productId;
    private String productName;
    private Double totalPrice;
    private String imageUrl;
    private int quantity;
    private Long variantId;
    private String sku;
}
