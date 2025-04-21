package com.ecommerce.product_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VariantOptionRequest {
    private String optionName;
    private String optionValue;
}
