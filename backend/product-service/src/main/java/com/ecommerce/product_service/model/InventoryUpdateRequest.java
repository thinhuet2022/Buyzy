package com.ecommerce.product_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InventoryUpdateRequest {
    private Long productId;
    private Long variantId;
    private Long quantity;
}
