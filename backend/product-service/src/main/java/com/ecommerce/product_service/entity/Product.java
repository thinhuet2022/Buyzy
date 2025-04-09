package com.ecommerce.product_service.entity;


import com.ecommerce.product_service.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String brand;
    private Double price;
    private Long stock;
    private Long soldQuantity = 0L;
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @ElementCollection
    private List<String> imageUrls;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
