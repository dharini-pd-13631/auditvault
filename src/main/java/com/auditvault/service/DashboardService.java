package com.auditvault.service;

import com.auditvault.dto.response.*;
import com.auditvault.entity.Deadline;
import com.auditvault.entity.User;
import com.auditvault.enums.AuditStatus;
import com.auditvault.exception.ResourceNotFoundException;
import com.auditvault.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AuditRepository auditRepository;
    private final DeadlineRepository deadlineRepository;
    private final UserRepository userRepository;
    private final AuditService auditService;

    public DashboardResponse getDashboard(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        long total = auditRepository.countByUserId(user.getId());
        long draft = auditRepository.countByUserIdAndStatus(user.getId(), AuditStatus.DRAFT);
        long inProgress = auditRepository.countByUserIdAndStatus(user.getId(), AuditStatus.IN_PROGRESS);
        long completed = auditRepository.countByUserIdAndStatus(user.getId(), AuditStatus.COMPLETED);

        List<AuditSummaryResponse> recent = auditService.getUserAudits(userEmail);
        List<DeadlineResponse> deadlines = deadlineRepository
                .findByDueDateAfterOrderByDueDateAsc(LocalDate.now())
                .stream().map(this::toDeadlineResponse).toList();

        return DashboardResponse.builder()
                .totalAudits(total).draftCount(draft)
                .inProgressCount(inProgress).completedCount(completed)
                .recentAudits(recent).upcomingDeadlines(deadlines)
                .build();
    }

    private DeadlineResponse toDeadlineResponse(Deadline d) {
        return DeadlineResponse.builder()
                .id(d.getId()).name(d.getName())
                .description(d.getDescription())
                .dueDate(d.getDueDate()).urgency(d.getUrgency())
                .build();
    }
}
