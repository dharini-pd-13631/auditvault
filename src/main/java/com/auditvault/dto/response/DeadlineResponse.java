package com.auditvault.dto.response;

import com.auditvault.enums.Urgency;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;

@Data @AllArgsConstructor @Builder
public class DeadlineResponse {
    private UUID id;
    private String name;
    private String description;
    private LocalDate dueDate;
    private Urgency urgency;
}
