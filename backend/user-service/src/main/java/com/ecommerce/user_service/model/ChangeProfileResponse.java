package com.ecommerce.user_service.model;

import lombok.Data;

@Data
public class ChangeProfileResponse {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
