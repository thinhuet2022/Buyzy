package com.ecommerce.product_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    private Long userId;

    private String reviewText;

    private Integer rating;

    @CreationTimestamp
    private String createdAt;

}
