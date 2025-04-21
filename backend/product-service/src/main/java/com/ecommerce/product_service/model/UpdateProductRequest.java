package com.ecommerce.product_service.model;

import com.ecommerce.product_service.enums.ProductStatus;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class UpdateProductRequest {
    @Enumerated
    private ProductStatus status;
    private Long stock;
}

