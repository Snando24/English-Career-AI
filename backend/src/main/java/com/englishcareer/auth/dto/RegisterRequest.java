package com.englishcareer.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO for user registration
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, max = 128, message = "Password must be between 8 and 128 characters")
    private String password;

    @NotBlank(message = "Password confirmation cannot be blank")
    private String passwordConfirm;

}
