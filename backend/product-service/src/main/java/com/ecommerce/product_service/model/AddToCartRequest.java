package com.ecommerce.product_service.model;

import lombok.Data;

@Data
public class AddToCartRequest {
    private Long productId;
    private Integer quantity;
    private Long selectedVariantId;
    private String sku;
}
