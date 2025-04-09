package com.ecommerce.product_service.model;

import com.ecommerce.product_service.entity.Category;
import com.ecommerce.product_service.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreationRequest {
    private String name;
    private String description;
    private Double price;
    private Category category;
    private String brand;
    private ProductStatus status;
    private Long stock;
}
