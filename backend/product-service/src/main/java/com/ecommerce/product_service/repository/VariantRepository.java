package com.ecommerce.product_service.repository;

import com.ecommerce.product_service.entity.Variant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VariantRepository extends JpaRepository<Variant, Long> {

}
