package com.ecommerce.api_gateway.filter;

import com.ecommerce.api_gateway.filter.RouteValidator;

import com.ecommerce.api_gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    //    @Autowired
//    private RestTemplate template;
    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())) {
                // Kiểm tra header Authorization
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("Missing Authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    throw new RuntimeException("Invalid Authorization header format");
                }

                String token = authHeader.substring(7);
                System.out.println("token: " + token);
                try {
                    //REST call to AUTH service
//                    template.getForObject("http://IDENTITY-SERVICE//validate?token" + authHeader, String.class);
                    jwtUtil.validateToken(token);
                    // Optional: attach claims vào request attributes nếu cần
                    System.out.println("hihihihihihihihihihih");
                } catch (Exception e) {
                    System.out.println("Invalid access: " + e.getMessage());
                    throw new RuntimeException("Unauthorized access to application");
                }
            }
            return chain.filter(exchange);
        });
    }


    public static class Config {

    }
}