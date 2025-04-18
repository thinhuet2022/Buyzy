package com.ecommerce.user_service.util;
import com.ecommerce.user_service.enums.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtUtil {

    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    // ✅ Tạo JWT Token với userId và email
    public String generateToken(String email, Role role, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        claims.put("email", email);
        return createToken(claims, email, userId);
    }
    private String createToken(Map<String, Object> claims, String email, Long userId) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userId.toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
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
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
