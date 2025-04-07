package com.ecommerce.user_service.controller;

import com.ecommerce.user_service.entity.Address;
import com.ecommerce.user_service.model.AddressRequest;
import com.ecommerce.user_service.model.ChangeProfileRequest;
import com.ecommerce.user_service.service.AddressService;
import com.ecommerce.user_service.service.CustomUserDetailsService;
import com.ecommerce.user_service.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/hello")
    public String hello() {
        return "Hello from User Service!";
    }

    @PostMapping("/change-profile")
    public ResponseEntity<?> changeProfile(@RequestBody ChangeProfileRequest changeProfileRequest) {
        userDetailsService.applyChangeProfile(changeProfileRequest);
        // Logic to change user profile
        return ResponseEntity.ok("Profile changed successfully");
    }

    @PostMapping("/update-address")
    public ResponseEntity<?> updateAddress(@RequestBody AddressRequest addressRequest,
                                           @RequestHeader("Authorization") String token) {
        // Logic to update user address
        Long userId = jwtUtil.extractUserId(token.substring(7));
        addressService.saveOrUpdateAddress(addressRequest, userId);
        return ResponseEntity.ok("Address updated successfully");
    }
}
