package com.englishcareer.common.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for health check and system info
 */
@RestController
@RequestMapping("/health")
@Slf4j
@Tag(name = "Health", description = "System health and info endpoints")
public class HealthController {

    @GetMapping
    @Operation(summary = "Health check", description = "Returns the health status of the API")
    public ResponseEntity<Map<String, Object>> health() {
        log.debug("Health check endpoint called");

        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "English Career AI API");
        response.put("version", "1.0.0-MVP");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/info")
    @Operation(summary = "API info", description = "Returns API information")
    public ResponseEntity<Map<String, Object>> info() {
        log.debug("Info endpoint called");

        Map<String, Object> response = new HashMap<>();
        response.put("name", "English Career AI API");
        response.put("version", "1.0.0-MVP");
        response.put("description", "Backend API for English learning platform");
        response.put("documentation", "/api/swagger-ui.html");

        return ResponseEntity.ok(response);
    }

}
