package com.ecommerce.product_service.model;

import com.ecommerce.product_service.entity.Category;
import com.ecommerce.product_service.entity.VariantOptions;
import com.ecommerce.product_service.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreationRequest {
    private String name;
    private String description;
    private String brand;
    private Double price;
    private Long stock;
    private ProductStatus status;
    private Long categoryId;

    private List<VariantRequest> variantRequestList;




}
