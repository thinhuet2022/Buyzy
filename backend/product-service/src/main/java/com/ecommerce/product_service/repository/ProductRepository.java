package com.ecommerce.product_service.repository;

import com.ecommerce.product_service.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(String query, Pageable pageable);

    Page<Product> findByCategoryName(String categoryName, Pageable pageable);

    List<Product> findTop5ByOrderBySoldQuantityDesc();

//    @Query("SELECT p FROM Product p SORT BY P.CREATED_AT DESC")
    List<Product> findTop18ByOrderByCreatedAtDesc();
}
