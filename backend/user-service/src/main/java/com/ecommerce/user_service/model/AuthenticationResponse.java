package com.ecommerce.user_service.model;

import com.ecommerce.user_service.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponse {
    private String jwt_token;
    private String email;
    private Role role;
}
