package com.ecommerce.user_service.dao;

import com.ecommerce.user_service.entity.PasswordResetCode;
import com.ecommerce.user_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PasswordResetCodeRepository extends JpaRepository<PasswordResetCode, Long> {
    PasswordResetCode findByUserEmailAndCode(String email, String code);
}
