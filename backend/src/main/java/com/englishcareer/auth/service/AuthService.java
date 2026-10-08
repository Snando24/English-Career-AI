package com.englishcareer.auth.service;

import com.englishcareer.auth.dto.AuthResponse;
import com.englishcareer.auth.dto.LoginRequest;
import com.englishcareer.auth.dto.RegisterRequest;
import com.englishcareer.auth.entity.User;
import com.englishcareer.auth.entity.UserProfile;
import com.englishcareer.auth.repository.UserRepository;
import com.englishcareer.auth.security.JwtTokenProvider;
import com.englishcareer.common.exception.ResourceAlreadyExistsException;
import com.englishcareer.common.exception.ResourceNotFoundException;
import com.englishcareer.common.exception.InvalidInputException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

/**
 * Service for authentication operations
 */
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    /**
     * Register a new user
     */
    public AuthResponse register(RegisterRequest registerRequest) {
        log.info("Registering new user with email: {}", registerRequest.getEmail());

        // Validate passwords match
        if (!registerRequest.getPassword().equals(registerRequest.getPasswordConfirm())) {
            throw new InvalidInputException("Passwords do not match");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already registered");
        }

        // Create new user
        User user = User.builder()
                .email(registerRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        User savedUser = userRepository.save(user);
        log.info("User registered successfully with ID: {}", savedUser.getId());

        // Generate tokens
        String token = tokenProvider.generateTokenFromUsername(savedUser.getEmail());
        String refreshToken = tokenProvider.generateRefreshToken(savedUser.getEmail());

        return AuthResponse.builder()
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .token(token)
                .refreshToken(refreshToken)
                .expiresIn(tokenProvider.getJwtExpirationMs())
                .tokenType("Bearer")
                .build();
    }

    /**
     * Login user
     */
    public AuthResponse login(LoginRequest loginRequest) {
        log.info("User login attempt with email: {}", loginRequest.getEmail());

        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String token = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());

        log.info("User logged in successfully: {}", user.getEmail());

        return AuthResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .token(token)
                .refreshToken(refreshToken)
                .expiresIn(tokenProvider.getJwtExpirationMs())
                .tokenType("Bearer")
                .build();
    }

    /**
     * Refresh JWT token
     */
    public AuthResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new InvalidInputException("Invalid refresh token");
        }

        String username = tokenProvider.getUsernameFromToken(refreshToken);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String newToken = tokenProvider.generateTokenFromUsername(user.getEmail());

        return AuthResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .token(newToken)
                .refreshToken(refreshToken)
                .expiresIn(tokenProvider.getJwtExpirationMs())
                .tokenType("Bearer")
                .build();
    }

    /**
     * Get current authenticated user
     */
    @Transactional(readOnly = true)
    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }

    /**
     * Get user by ID
     */
    @Transactional(readOnly = true)
    public User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
    }

}
