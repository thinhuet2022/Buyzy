package com.ecommerce.user_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountCreationResponse {
    private String message;
    private String creation_status;
    private String email;

}
