package com.auditvault.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data @AllArgsConstructor @Builder
public class AuthResponse {
    private String token;
    private String email;
    private String fullName;
    private List<String> roles;
}
