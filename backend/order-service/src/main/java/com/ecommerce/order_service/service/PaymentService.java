package com.ecommerce.order_service.service;

import com.ecommerce.order_service.config.VNPayConfig;
import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.entity.Payment;
import com.ecommerce.order_service.enums.OrderStatus;
import com.ecommerce.order_service.enums.PaymentStatus;
import com.ecommerce.order_service.model.OrderResponse;
import com.ecommerce.order_service.model.PaymentResponse;
import com.ecommerce.order_service.repository.OrderRepository;
import com.ecommerce.order_service.repository.PaymentRepository;
import com.ecommerce.order_service.utils.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Map;

@Service
public class PaymentService {
    @Autowired
    VNPayConfig vnPayConfig;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    PaymentRepository paymentRepository;

    private String generateTxnRef(Long orderId) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        return "ORD" + orderId + "-" + timestamp;
    }

    private Long extractOrderIdFromTxnRef(String txnRef) {
        try {
            String[] parts = txnRef.split("-");
            String orderIdPart = parts[0].substring(3);
            return Long.parseLong(orderIdPart);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid TxnRef format: " + txnRef);
        }
    }

    @Transactional
    public String createVnPayPayment(HttpServletRequest request, BigDecimal amount, Long orderId)
            throws UnsupportedEncodingException {
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount.multiply(BigDecimal.valueOf(100))));
        vnpParamsMap.put("vnp_TxnRef", generateTxnRef(orderId));
        vnpParamsMap.put("vnp_OrderInfo", "Thanh toán đơn hàng #" + orderId);

        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        // build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        return vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
    }

    public PaymentResponse handleVnPayReturn(HttpServletRequest request) throws Exception {
        Map<String, String> params = VNPayUtil.getParamsFromRequest(request);

        String vnpSecureHash = params.remove("vnp_SecureHash");

        String hashData = VNPayUtil.getPaymentURL(params, false);

        String calculatedHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);

        if (!calculatedHash.equals(vnpSecureHash)) {
            throw new Exception("Invalid secure hash");
        }


        String responseCode = params.get("vnp_ResponseCode");
        if (!"00".equals(responseCode)) {
            throw new Exception("Invalid response code");
        }

        String transactionId = params.get("vnp_TransactionNo");
        String orderId = String.valueOf(extractOrderIdFromTxnRef(params.get("vnp_TxnRef")));
        BigDecimal amount = new BigDecimal(params.get("vnp_Amount")).divide(BigDecimal.valueOf(100));

        Order order = orderRepository.findById(Long.valueOf(orderId))
                .orElseThrow(() -> new Exception("Order not found"));

        Payment payment = paymentRepository.findByOrderId(order.getId());

        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setTransactionId(transactionId);
        paymentRepository.save(payment);

        orderRepository.save(order);

        return PaymentResponse.builder()
                .orderId(order.getId())
                .transactionId(transactionId)
                .status(payment.getStatus())
                .amount(amount)
                .build();
    }

}
