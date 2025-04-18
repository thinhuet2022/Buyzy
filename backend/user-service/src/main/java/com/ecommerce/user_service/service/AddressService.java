package com.ecommerce.user_service.service;

import com.ecommerce.user_service.dao.AddressRepository;
import com.ecommerce.user_service.dao.UserRepository;
import com.ecommerce.user_service.entity.Address;
import com.ecommerce.user_service.entity.User;
import com.ecommerce.user_service.model.AddressRequest;
import com.ecommerce.user_service.model.AddressResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    public AddressResponse saveOrUpdateAddress(AddressRequest addressRequest, String email) {
        User user = userRepository.findByEmail(email);

        Optional<Address> existingAddress = addressRepository.findFirstByUserId(user.getId());
        Address address = existingAddress.orElse(new Address());
        address.setStreet(addressRequest.getStreet());
        address.setWard(addressRequest.getWard());
        address.setCity(addressRequest.getCity());
        address.setDistrict(addressRequest.getDistrict());
        address.setCountry(addressRequest.getCountry());
        address.setUser(user);
        address.setDefault(addressRequest.isDefaultAddress());
        addressRepository.save(address);

        return new AddressResponse(address.getStreet(),
                                                              address.getCity(),
                                                              address.getDistrict(),
                                                              address.getWard(),
                                                              address.getCountry(),
                                                              true);
    }

    public AddressResponse getAddressByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Address> address = addressRepository.findFirstByUserId(userId);
        AddressResponse addressResponse = new AddressResponse();
        if (address.isPresent()) {
            addressResponse.setStreet(address.get().getStreet());
            addressResponse.setCity(address.get().getCity());
            addressResponse.setDistrict(address.get().getDistrict());
            addressResponse.setCountry(address.get().getCountry());
            addressResponse.setWard(address.get().getWard());
            addressResponse.setDefaultAddress(address.get().isDefault());
        } else {
            addressResponse.setStreet("");
            addressResponse.setCity("");
            addressResponse.setDistrict("");
            addressResponse.setCountry("");
            addressResponse.setWard("");
            addressResponse.setDefaultAddress(false);
        }
        return addressResponse;
    }
}
