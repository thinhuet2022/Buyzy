package com.ecommerce.order_service.repository;

import com.ecommerce.order_service.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByOrderId(Long id);
    // Define methods for payment-related database operations
    // For example:
    // Payment findPaymentById(Long id);
    // List<Payment> findAllPayments();
    // void savePayment(Payment payment);
    // void deletePayment(Long id);
}
