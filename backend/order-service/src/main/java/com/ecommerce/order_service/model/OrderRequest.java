package com.ecommerce.order_service.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private Long productId;
    private int quantity;
    private String description;
    private Double price;
    private String imageUrl;
}
