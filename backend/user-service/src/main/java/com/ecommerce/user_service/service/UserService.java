package com.ecommerce.user_service.service;

import com.ecommerce.user_service.dao.UserRepository;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.model.ChangeProfileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void applyChangeProfile(ChangeProfileRequest changeProfileRequest) {
        User user = userRepository.findByEmail(changeProfileRequest.getEmail());
        if (user != null) {
            user.setFirstName(changeProfileRequest.getFirstName());
            user.setLastName(changeProfileRequest.getLastName());
            user.setPhoneNumber(changeProfileRequest.getPhoneNumber());
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
