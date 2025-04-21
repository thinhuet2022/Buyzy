package com.ecommerce.product_service.model;

import com.ecommerce.product_service.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductCreationResponse {
    private Long productId;
    private String productName;
    private String productDescription;
    private Double productPrice;
    private ProductStatus productStatus;
    private Long productStock;
    private String productCategory;
    private String productBrand;
}
