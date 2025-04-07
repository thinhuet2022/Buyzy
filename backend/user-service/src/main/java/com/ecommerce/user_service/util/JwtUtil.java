package com.ecommerce.user_service.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtUtil {

    private static final String SECRET_KEY = "JxADc+fxold2eO2L9uEUQk2Onjt4xGO6kIZMF+320A4=";
    private static final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 giờ

    // ✅ Tạo JWT Token với userId và email
    public String generateToken(Long userId, String email) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))              // userId là sub
                .claim("email", email)                           // thêm email
                .setIssuedAt(new Date())                         // ngày phát hành
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // hết hạn
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    // ✅ Trích xuất userId (ở sub)
    public Long extractUserId(String token) {
        return Long.parseLong(getClaims(token).getSubject());
    }

    // ✅ Trích xuất email từ claim
    public String extractEmail(String token) {
        return getClaims(token).get("email", String.class);
    }

    // ✅ Kiểm tra token hết hạn chưa
    public boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // ✅ Kiểm tra token hợp lệ với email
    public boolean validateToken(String token, String email) {
        try {
            String extractedEmail = extractEmail(token);
            return extractedEmail.equals(email) && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // ✅ Lấy claims chung
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
