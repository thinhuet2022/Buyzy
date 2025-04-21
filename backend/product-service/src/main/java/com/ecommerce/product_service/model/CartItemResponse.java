package com.ecommerce.product_service.model;

import lombok.Data;

@Data
public class CartItemResponse {
    private Long id;
    private Integer quantity;
    private Double price;
    private Long productId;
    private String productName;
    private String productImage;
    private String sku;
}
