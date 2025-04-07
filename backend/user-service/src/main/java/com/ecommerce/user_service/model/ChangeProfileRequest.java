package com.ecommerce.user_service.model;

import com.ecommerce.user_service.entity.Address;
import lombok.Data;

@Data
public class ChangeProfileRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
