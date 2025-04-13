package com.ecommerce.user_service.controller;

import com.ecommerce.user_service.entity.Address;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.model.AddressRequest;
import com.ecommerce.user_service.model.ChangeProfileRequest;
import com.ecommerce.user_service.service.AddressService;
import com.ecommerce.user_service.service.UserService;
import com.ecommerce.user_service.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

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
        userService.applyChangeProfile(changeProfileRequest);
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

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
        // Logic to get user details
        Long userId = jwtUtil.extractUserId(token.substring(7));
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}
