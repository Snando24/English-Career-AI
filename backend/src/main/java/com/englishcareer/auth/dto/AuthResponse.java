package com.englishcareer.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO for authentication response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private UUID userId;
    private String email;
    private String token;
    private String refreshToken;
    private Long expiresIn;
    private String tokenType;

}
