package com.auditvault.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateAuditRequest {
    @NotBlank
    private String templateSlug;

    @NotBlank @Size(max = 200)
    private String title;

    @Size(max = 200)
    private String clientName;

    private LocalDate dueDate;
}
