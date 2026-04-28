package com.auditvault.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AssignRoleRequest {
    @NotBlank
    private String roleName;
}
