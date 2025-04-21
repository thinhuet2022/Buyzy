package com.ecommerce.product_service.repository;

import com.ecommerce.product_service.entity.VariantOptions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VariantOptionRepository extends JpaRepository<VariantOptions, Long> {
}
