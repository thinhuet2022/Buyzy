package com.ecommerce.user_service.model;


import com.ecommerce.user_service.enums.Role;
import jakarta.persistence.Enumerated;
import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AccountCreationRequest {
    private String email;
    private String password;
    private String confirmPassword;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    @Enumerated
    private Role role;
}
