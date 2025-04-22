package com.ecommerce.order_service.model;

import lombok.Data;

@Data
public class ShippingAddress {
    private String firstName;
    private String lastName;
    private String ward;
    private String district;
    private String province;
    private String address;
    private String email;
    private String additionalInfo;
    private String phoneNumber;
}
