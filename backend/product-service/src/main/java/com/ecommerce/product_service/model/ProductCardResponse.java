package com.ecommerce.product_service.model;

import lombok.Data;

@Data
public class ProductCardResponse {
    private Long productId;
    private String productName;
    private Double productPrice;
    private String imageUrl;
    private int soldQuantity;
    private Double rating;
}
