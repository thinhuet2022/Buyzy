package com.ecommerce.order_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
public class InventoryUpdateRequest {
    private Long productId;
    private Long variantId;
    private Long quantity;
}
