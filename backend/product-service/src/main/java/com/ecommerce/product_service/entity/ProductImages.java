package com.ecommerce.product_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
// @Table(name = "product_images")
public class ProductImages {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
