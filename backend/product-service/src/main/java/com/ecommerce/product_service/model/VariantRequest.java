package com.ecommerce.product_service.model;

import com.ecommerce.product_service.entity.VariantOptions;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
@AllArgsConstructor
public class VariantRequest {
    private List<VariantOptionRequest> variantOptions;
    private Long stock;
    private Double price;

}
