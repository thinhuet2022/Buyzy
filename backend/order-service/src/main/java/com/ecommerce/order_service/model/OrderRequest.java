package com.ecommerce.order_service.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private Long productId;
    private Long quantity;
    private String productName;
    private Double totalPrice;
    private String imageUrl;
    private Long variantId;
    private String sku;
}
