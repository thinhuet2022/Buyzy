package com.ecommerce.order_service.model;

import com.ecommerce.order_service.enums.PaymentStatus;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public class PaymentResponse {
    private Long orderId;
    private String transactionId;
    private PaymentStatus status;
    private BigDecimal amount;
}
