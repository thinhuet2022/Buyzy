package com.ecommerce.api_gateway.config;//package com.ecommerce.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.client.RestTemplate;


import java.util.List;

@Configuration
public class SecurityConfig {
    @Bean
    public RestTemplate template(){
        return new RestTemplate();
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                // ✅ CORS
                .csrf().disable(); // ✅ Tắt CSRF
        return http.build();
    }

}
