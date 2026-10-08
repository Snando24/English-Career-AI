package com.englishcareer.auth.controller;

import com.englishcareer.auth.dto.AuthResponse;
import com.englishcareer.auth.dto.LoginRequest;
import com.englishcareer.auth.dto.RegisterRequest;
import com.englishcareer.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for authentication operations
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User authentication endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user account with email and password")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        AuthResponse response = authService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticates user and returns JWT token")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh JWT token", description = "Generates a new JWT token using a refresh token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestParam String refreshToken) {
        AuthResponse response = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }

}
