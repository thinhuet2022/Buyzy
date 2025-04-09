package com.ecommerce.product_service.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutRequestItem {
    private Long productId;
    private int quantity;
    private Long cartItemId;
}
