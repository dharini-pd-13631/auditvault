package com.auditvault.dto.request;

import com.auditvault.enums.ResponseStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.UUID;

@Data
public class SaveResponseRequest {
    @NotNull
    private UUID checklistItemId;

    @NotNull
    private ResponseStatus status;

    private String notes;

    private String evidenceUrl;
}
