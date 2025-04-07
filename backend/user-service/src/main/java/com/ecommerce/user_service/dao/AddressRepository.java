package com.ecommerce.user_service.dao;

import com.ecommerce.user_service.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findFirstByUserId(Long userId);
}
