package com.ecommerce.order_service.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import java.util.TimeZone;

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
    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        System.out.println(">>> Default TimeZone set to Asia/Ho_Chi_Minh");
    }
}