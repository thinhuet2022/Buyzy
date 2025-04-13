package com.ecommerce.api_gateway.config;//package com.ecommerce.api_gateway.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
//import org.springframework.security.config.web.server.ServerHttpSecurity;
//import org.springframework.security.web.server.SecurityWebFilterChain;
//import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
//import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
//
//@Configuration
//public class SecurityConfig {
////
////    private final JwtAuthenticationManager jwtAuthenticationManager;
////    private final JwtAuthenticationConverter jwtAuthenticationConverter;
////
////    public SecurityConfig(JwtAuthenticationManager jwtAuthenticationManager) {
////        this.jwtAuthenticationManager = jwtAuthenticationManager;
////        this.jwtAuthenticationConverter = new JwtAuthenticationConverter();
////    }
//
//    @Bean
//    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
////        AuthenticationWebFilter jwtAuthFilter = new AuthenticationWebFilter(jwtAuthenticationManager);
////        jwtAuthFilter.setServerAuthenticationConverter(jwtAuthenticationConverter);
//        return http
//                .csrf(ServerHttpSecurity.CsrfSpec::disable)  // Tắt CSRF vì đây là API dạng REST
////                .authorizeExchange(exchanges -> exchanges
////                        .pathMatchers("/api/v1/auth/**").permitAll()  // Cho phép không cần xác thực cho /api/v1/auth
////                        .anyExchange().authenticated()  // Các request khác phải xác thực
////                )
////                .addFilterAt(jwtAuthFilter, SecurityWebFiltersOrder.AUTHENTICATION)
////                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())  // Không cần lưu security context cho WebFlux
//                .build();
//    }
//}
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http.csrf().disable(); // ✅ Tắt CSRF
        return http.build();
    }
}
