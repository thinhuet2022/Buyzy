package com.ecommerce.user_service.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.user_service.dao.AddressRepository;
import com.ecommerce.user_service.dao.UserRepository;
import com.ecommerce.user_service.entity.Address;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.model.ChangeProfileRequest;
import com.ecommerce.user_service.model.ChangeProfileResponse;
import com.ecommerce.user_service.model.ProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private AddressRepository addressRepository;

    public String uploadImage(MultipartFile image) {
        try {
            // Upload the image to Cloudinary
            Map<?,?> uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("secure_url");
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    public ChangeProfileResponse applyChangeProfile(ChangeProfileRequest changeProfileRequest) {
        User user = userRepository.findByEmail(changeProfileRequest.getEmail());
        ChangeProfileResponse changeProfileResponse = new ChangeProfileResponse();
        if (user != null) {
            user.setFirstName(changeProfileRequest.getFirstName());
            user.setLastName(changeProfileRequest.getLastName());
            user.setPhoneNumber(changeProfileRequest.getPhoneNumber());
            userRepository.save(user);

            changeProfileResponse.setFirstName(user.getFirstName());
            changeProfileResponse.setLastName(user.getLastName());
            changeProfileResponse.setEmail(user.getEmail());
            changeProfileResponse.setPhoneNumber(user.getPhoneNumber());
        } else {
            throw new RuntimeException("User not found");
        }
        return changeProfileResponse;
    }

    public ProfileResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Address> address = addressRepository.findFirstByUserId(userId);
        ProfileResponse profileResponse = new ProfileResponse();
        profileResponse.setFirstName(user.getFirstName());
        profileResponse.setLastName(user.getLastName());
        profileResponse.setEmail(user.getEmail());
        profileResponse.setPhoneNumber(user.getPhoneNumber());
        profileResponse.setImageUrl(user.getImageUrl());
        profileResponse.setCreatedAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : "None");
        address.ifPresent(addr -> {
            profileResponse.setStreet(addr.getStreet());
            profileResponse.setCity(addr.getCity());
            profileResponse.setDistrict(addr.getDistrict());
            profileResponse.setWard(addr.getWard());
        });
        return profileResponse;
    }

    public String updateUserImage(Long userId, MultipartFile image) {
        String imageUrl = uploadImage(image);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setImageUrl(imageUrl);
        userRepository.save(user);
        return imageUrl;
    }
}
