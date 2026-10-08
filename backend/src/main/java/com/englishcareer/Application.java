package com.englishcareer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * English Career AI API - Main Application Entry Point
 *
 * Adaptive learning platform for English language acquisition,
 * tailored specifically for tech professionals.
 */
@SpringBootApplication
@EnableCaching
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
