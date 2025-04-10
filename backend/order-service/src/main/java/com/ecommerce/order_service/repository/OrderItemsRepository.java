package com.ecommerce.order_service.repository;

import com.ecommerce.order_service.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
    List<OrderItems> findByOrderId(Long id);
}
