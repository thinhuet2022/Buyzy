package com.ecommerce.product_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.repository.cdi.Eager;

@Entity
@Data
@Table(name = "variant_options")
public class VariantOptions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String optionName;

    private String optionValue;

    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false)
    @JsonIgnore
    private Variant variant;
}
