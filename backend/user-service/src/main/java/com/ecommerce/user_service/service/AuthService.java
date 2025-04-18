package com.ecommerce.user_service.service;

import com.ecommerce.user_service.dao.PasswordResetCodeRepository;
import com.ecommerce.user_service.dao.UserRepository;
import com.ecommerce.user_service.entity.PasswordResetCode;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.enums.Role;
import com.ecommerce.user_service.model.AccountCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetCodeRepository passwordResetCodeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;


    public boolean hasEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public String createUser(AccountCreationRequest accountCreationRequest) {
        User user = new User();
        user.setFirstName(accountCreationRequest.getFirstName());
        user.setLastName(accountCreationRequest.getLastName());
        user.setEmail(accountCreationRequest.getEmail());
        user.setPhoneNumber(accountCreationRequest.getPhoneNumber());
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(accountCreationRequest.getPassword());
        user.setPassword(hashedPassword);
        user.setRole(accountCreationRequest.getRole());
        userRepository.save(user);

        return accountCreationRequest.getEmail();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public void sendResetPasswordCode(User user) {
        PasswordResetCode passwordResetCode = new PasswordResetCode();
        passwordResetCode.setUser(user);
        String code = generateRandomCode();
        passwordResetCode.setCode(code);
        passwordResetCode.setExpiryDate(LocalDateTime.now().plusMinutes(2)); // Set expiry time to 15 minutes
        passwordResetCodeRepository.save(passwordResetCode);
        emailService.sendEmail(user.getEmail(), "Password Reset Code", "Your password reset code is: " + code);
    }

    private String generateRandomCode() {
        // Generate a random 6-digit code
        int code = (int) (Math.random() * 900000) + 100000;
        return String.valueOf(code);
    }

    public boolean findByEmailAndCode(String email, String code) {
        PasswordResetCode passwordResetCode = passwordResetCodeRepository.findByUserEmailAndCode(email, code);
        if (passwordResetCode != null) {
            LocalDateTime now = LocalDateTime.now();
            if (passwordResetCode.getExpiryDate().isAfter(now)) {
                passwordResetCodeRepository.delete(passwordResetCode); // Delete the used code
                return true; // Code is valid
            } else {

                passwordResetCodeRepository.delete(passwordResetCode); // Delete expired code
            }
        }
        return false; // Code is invalid or not found
    }

    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            String hashedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(hashedPassword);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
