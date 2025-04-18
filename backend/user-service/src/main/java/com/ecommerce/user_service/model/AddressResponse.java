package com.ecommerce.user_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressResponse {
    private String street;
    private String city;
    private String district;
    private String ward;
    private String country;
    private boolean isDefault;

    public void setDefaultAddress(boolean aDefault) {
        this.isDefault = aDefault;
    }
}
