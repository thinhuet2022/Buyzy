package com.ecommerce.api_gateway.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {


    public static final String SECRET = "JxADc+fxold2eO2L9uEUQk2Onjt4xGO6kIZMF+320A4=";


    public void validateToken(final String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        Date expiration = claims.getExpiration();
        if (expiration.before(new Date())) {
            throw new RuntimeException("Token expired");
        }
    }



    private Key getSignKey() {
        byte[] keyBytes = JwtUtil.SECRET.getBytes(StandardCharsets.UTF_8); // 👈 giống auth-service
        return Keys.hmacShaKeyFor(keyBytes);
    }
}