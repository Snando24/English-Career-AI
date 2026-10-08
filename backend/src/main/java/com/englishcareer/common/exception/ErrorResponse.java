package com.englishcareer.common.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Global API error response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {

    private String status;
    private int code;
    private String message;
    private String path;
    private LocalDateTime timestamp;
    private List<String> errors;

}
