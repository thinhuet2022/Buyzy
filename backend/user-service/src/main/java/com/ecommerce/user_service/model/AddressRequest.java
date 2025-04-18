package com.ecommerce.user_service.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddressRequest {
    private String street;
    private String city;
    private String district;
    private String ward;
    private String country;
    private boolean isDefault;

    public boolean isDefaultAddress() {
        return isDefault;
    }
}
