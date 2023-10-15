package com.example.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public interface JWTService {
    String generateToken(UserDetails userDetails);
    String generateRefreshToken(Map<String, Objects> extractClaims, UserDetails userDetails);

    String extractUsername(String token) ;

    boolean isTokenValid(String token, UserDetails userDetails);


}
