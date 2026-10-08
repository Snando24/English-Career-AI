package com.englishcareer.auth.config;

import com.englishcareer.auth.security.JwtAuthenticationFilter;
import com.englishcareer.auth.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security configuration
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setContentType("application/json");
                            response.setStatus(401);
                            response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"" + authException.getMessage() + "\"}");
                        }))
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(HttpMethod.POST, "/api/auth/register", "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()
                        .requestMatchers("/api/health", "/api/health/**").permitAll()
                        .requestMatchers("/api/swagger-ui/**", "/api/v3/api-docs/**", "/api/swagger-ui.html").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtTokenProvider, userDetailsService);
    }

}
