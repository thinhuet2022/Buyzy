package com.ecommerce.user_service.service;

import com.ecommerce.user_service.dao.UserRepository;
import com.ecommerce.user_service.entity.Address;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.model.ChangeProfileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());

    }

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

}
