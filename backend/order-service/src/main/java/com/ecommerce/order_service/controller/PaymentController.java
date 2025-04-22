package com.ecommerce.order_service.controller;


import com.ecommerce.order_service.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @Value("${frontend.payment.result.url}")
    private String paymentResultBaseUrl;


    @GetMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request, @RequestParam BigDecimal amount, @RequestParam Long orderId)
            throws UnsupportedEncodingException {
        return ResponseEntity.ok(paymentService.createVnPayPayment(request, amount, orderId));
    }

    @GetMapping("/vn-pay-return")
    public RedirectView payCallbackHandler(HttpServletRequest request) throws Exception {
        String status = request.getParameter("vnp_ResponseCode");

        // Gọi xử lý logic
        paymentService.handleVnPayReturn(request);

        // Redirect về frontend đang chạy local
        return new RedirectView(paymentResultBaseUrl + "?status=" + status);
    }

}
