package com.ecommerce.order_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests()
                //           .requestMatchers("/api/v1/products/").permitAll() // Cho phép không cần auth
                .anyRequest().permitAll()
                .and()
                .httpBasic(); // Hoặc formLogin nếu cần

        return http.build();
    }
}