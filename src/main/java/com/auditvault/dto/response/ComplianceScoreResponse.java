package com.auditvault.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data @AllArgsConstructor @Builder
public class ComplianceScoreResponse {
    private String templateName;
    private int score;
    private int totalItems;
    private int compliantItems;
}
