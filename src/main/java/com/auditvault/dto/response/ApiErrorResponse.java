package com.auditvault.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.Instant;

@Data @AllArgsConstructor @Builder
public class ApiErrorResponse {
    private int status;
    private String message;
    private String path;
    @Builder.Default
    private Instant timestamp = Instant.now();
}
