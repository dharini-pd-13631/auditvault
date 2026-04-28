package com.auditvault.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data @AllArgsConstructor @Builder
public class UserResponse {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private String firmName;
    private Boolean isActive;
    private List<String> roles;
    private Instant createdAt;
}
