package com.ecommerce.api_gateway.config;//package com.ecommerce.api_gateway.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.client.RestTemplate;


import java.util.List;
import java.util.TimeZone;

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
    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        System.out.println(">>> Default TimeZone set to Asia/Ho_Chi_Minh");
    }
}
