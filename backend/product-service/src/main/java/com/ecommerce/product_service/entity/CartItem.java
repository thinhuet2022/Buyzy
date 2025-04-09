package com.ecommerce.product_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cart_items")
public class CartItem {


    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Double totalPrice;
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

}
