package com.ecommerce.product_service.repository;

import com.ecommerce.product_service.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findAllByUserId(Long userId);

    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

    Optional<CartItem> findByUserIdAndVariantId(Long userId, Long selectedVariantId);
}
