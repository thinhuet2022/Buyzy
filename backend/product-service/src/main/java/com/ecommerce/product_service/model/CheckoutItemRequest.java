package com.ecommerce.product_service.model;

import com.ecommerce.product_service.entity.Variant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutItemRequest {
    private Long productId;
    private int quantity;
    private Long cartItemId;
}
