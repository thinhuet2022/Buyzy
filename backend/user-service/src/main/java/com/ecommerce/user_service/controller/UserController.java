package com.ecommerce.user_service.controller;

import com.ecommerce.user_service.entity.Address;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.model.*;
import com.ecommerce.user_service.service.AddressService;
import com.ecommerce.user_service.service.UserService;
import com.ecommerce.user_service.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
        return "Hello from thinh!";
    }

    @PostMapping("/change-profile")
    public ResponseEntity<?> changeProfile(@RequestBody ChangeProfileRequest changeProfileRequest) {
        try {
            // Validate the request
            if (changeProfileRequest.getFirstName().isEmpty() || changeProfileRequest.getLastName().isEmpty()) {
                return ResponseEntity.badRequest().body("First name and last name are required");
            }
            if (changeProfileRequest.getPhoneNumber().isEmpty()) {
                return ResponseEntity.badRequest().body("Phone number is required");
            }
            if (!changeProfileRequest.getPhoneNumber().matches("\\d{10}")) {
                return ResponseEntity.badRequest().body("Phone number must be 10 digits");
            }
            if (!changeProfileRequest.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                return ResponseEntity.badRequest().body("Invalid email format");
            }

            // Apply changes to the user profile
            ChangeProfileResponse changeProfileResponse = userService.applyChangeProfile(changeProfileRequest);
            return ResponseEntity.status(HttpStatus.OK).body(changeProfileResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating profile: " + e.getMessage());
        }
    }

    @PostMapping("/update-address")
    public ResponseEntity<?> updateAddress(@RequestBody AddressRequest addressRequest,
                                           @RequestParam("email") String email) {
        // Logic to update user address
        AddressResponse addressResponse = addressService.saveOrUpdateAddress(addressRequest, email);
        return ResponseEntity.status(HttpStatus.OK).body(addressResponse);
    }

    @GetMapping("/get-address")
    public ResponseEntity<?> getAddress(@RequestHeader ("Authorization") String token) {
        // Logic to get user address
        Long userId = jwtUtil.extractUserId(token.substring(7));
        AddressResponse addressResponse = addressService.getAddressByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(addressResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token) {
        // Logic to get user details
        Long userId = jwtUtil.extractUserId(token.substring(7));
        ProfileResponse profileResponse = userService.getUserById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(profileResponse);
    }

    @GetMapping("/user-image")
    public ResponseEntity<?> getUserImage(@RequestHeader("Authorization") String token) {
        // Logic to get user image
        Long userId = jwtUtil.extractUserId(token.substring(7));
        String imageUrl = userService.getUserImage(userId);
        return ResponseEntity.status(HttpStatus.OK).body(imageUrl);
    }


    @PostMapping(value = "/update-user-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUserImage(@RequestParam("image") MultipartFile image,
                                             @RequestHeader("Authorization") String token) throws Exception{
        // Logic to update user image
        Long userId = jwtUtil.extractUserId(token.substring(7));
        try {
            String imageUrl = userService.updateUserImage(userId, image);
            return ResponseEntity.status(HttpStatus.OK).body(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user image: " + e.getMessage());
        }
    }
}
