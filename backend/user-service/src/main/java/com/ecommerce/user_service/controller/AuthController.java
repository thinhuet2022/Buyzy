package com.ecommerce.user_service.controller;

import com.ecommerce.user_service.dao.PasswordResetCodeRepository;
import com.ecommerce.user_service.entity.PasswordResetCode;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.model.AccountCreationRequest;
import com.ecommerce.user_service.model.AccountCreationResponse;
import com.ecommerce.user_service.model.AuthenticationRequest;
import com.ecommerce.user_service.model.AuthenticationResponse;
import com.ecommerce.user_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.user_service.util.JwtUtil;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordResetCodeRepository passwordResetCodeRepository;

    @PostMapping("/signup")
    ResponseEntity<?> createAccount(@RequestBody AccountCreationRequest accountCreationRequest) {
        if (accountCreationRequest.getFirstName().isEmpty() || accountCreationRequest.getLastName().isEmpty()) {
            return ResponseEntity.badRequest().body(new AccountCreationResponse("First name and last name are required", "failure"));
        }
        if (accountCreationRequest.getPhoneNumber().isEmpty()) {
            return ResponseEntity.badRequest().body(new AccountCreationResponse("Phone number is required", "failure"));
        }
        if (!accountCreationRequest.getPhoneNumber().matches("\\d{10}")) {
            return ResponseEntity.badRequest().body(new AccountCreationResponse("Phone number must be 10 digits", "failure"));
        }
        if (authService.hasEmail(accountCreationRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new AccountCreationResponse("Email already exists", "failure"));
        }
        if (!accountCreationRequest.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.badRequest().body(new AccountCreationResponse("Invalid email format", "failure"));
        }
        if (accountCreationRequest.getPassword().length() < 8) {
            return ResponseEntity.badRequest().body(new AccountCreationResponse("Password must be at least 8 characters long", "failure"));
        }

        if (!accountCreationRequest.getPassword().equals(accountCreationRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(new AccountCreationResponse("Passwords do not match", "failure"));
        }

        
        User user = new User();
        user.setEmail(accountCreationRequest.getEmail());
        user.setPassword(accountCreationRequest.getPassword());
        user.setFirstName(accountCreationRequest.getFirstName());
        user.setLastName(accountCreationRequest.getLastName());
        user.setPhoneNumber(accountCreationRequest.getPhoneNumber());

        authService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AccountCreationResponse("Account created successfully", "success"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
        String email = authenticationRequest.getEmail();
        String password = authenticationRequest.getPassword();

        if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        // Kiểm tra email có tồn tại trong DB không
        User user = authService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email does not exist");
        }

        // Kiểm tra mật khẩu nhập vào có khớp với mật khẩu hash không
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email or password");
        }

        // Nếu đúng → Tạo JWT token
        final String jwt = jwtUtil.generateToken(user.getId(), user.getEmail());

        return ResponseEntity.ok(new AuthenticationResponse(jwt, "success"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        // Kiểm tra email có tồn tại trong DB không
        User user = authService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email does not exist");
        }
        authService.sendResetPasswordCode(user);
        // Gửi email reset password (chưa làm)
        return ResponseEntity.ok("Reset password code has been sent to your email. Please check your inbox.");
    }

    @PostMapping("/verify-reset-code")
    public ResponseEntity<?> verifyResetCode(@RequestParam String email, @RequestParam String code) {
        // Kiểm tra email có tồn tại trong DB không
        User user = authService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email does not exist");
        }
        // Kiểm tra mã reset password có đúng không (chưa làm)
        // Nếu đúng → Cho phép người dùng nhập mật khẩu mới
        if(!authService.findByEmailAndCode(email, code)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid reset code");
        }
        return ResponseEntity.ok("Reset code is valid. You can now enter a new password.");
    }
}
