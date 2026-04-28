package com.auditvault.dto.response;

import com.auditvault.enums.AuditStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Data @AllArgsConstructor @Builder
public class AuditSummaryResponse {
    private UUID id;
    private String title;
    private String clientName;
    private String templateName;
    private AuditStatus status;
    private LocalDate dueDate;
    private Instant createdAt;
}
