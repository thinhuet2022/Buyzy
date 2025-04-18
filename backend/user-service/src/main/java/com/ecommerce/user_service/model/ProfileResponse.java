package com.ecommerce.user_service.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@JsonPropertyOrder(alphabetic = false)
@Data
public class ProfileResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String street;
    private String city;
    private String district;
    private String ward;
    private String imageUrl;
    private String createdAt;
}
