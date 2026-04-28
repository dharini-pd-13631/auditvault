package com.auditvault.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data @AllArgsConstructor @Builder
public class DashboardResponse {
    private long totalAudits;
    private long draftCount;
    private long inProgressCount;
    private long completedCount;
    private List<AuditSummaryResponse> recentAudits;
    private List<DeadlineResponse> upcomingDeadlines;
    private List<ComplianceScoreResponse> complianceScores;
}
