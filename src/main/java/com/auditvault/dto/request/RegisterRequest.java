package com.auditvault.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank @Size(max = 100)
    private String fullName;

    @NotBlank @Email @Size(max = 150)
    private String email;

    @NotBlank @Size(min = 8, max = 100)
    private String password;

    @Size(max = 20)
    private String phone;

    @Size(max = 200)
    private String firmName;

    private String roleName;
}
