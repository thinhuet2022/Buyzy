package com.ecommerce.user_service.service;

import com.ecommerce.user_service.dao.AddressRepository;
import com.ecommerce.user_service.dao.UserRepository;
import com.ecommerce.user_service.entity.Address;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.model.AddressRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    public void saveOrUpdateAddress(AddressRequest addressRequest, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Address> existingAddress = addressRepository.findFirstByUserId(userId);
        Address address = existingAddress.orElse(new Address());
        address.setStreet(addressRequest.getStreet());
        address.setCity(addressRequest.getCity());
        address.setDistrict(addressRequest.getDistrict());
        address.setZipCode(addressRequest.getZipCode());
        address.setCountry(addressRequest.getCountry());
        address.setUser(user);
        address.setDefault(addressRequest.isDefaultAddress());
        addressRepository.save(address);
    }
}
