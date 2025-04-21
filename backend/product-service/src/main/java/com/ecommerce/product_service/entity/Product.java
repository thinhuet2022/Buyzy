package com.ecommerce.product_service.entity;


import com.ecommerce.product_service.enums.ProductStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
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


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImages> imageUrls;

    @Column(name = "user_id", nullable = false)
    private Long sellerId;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Variant> variant;

    @Nullable
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

}
