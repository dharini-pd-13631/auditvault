package com.auditvault.service;

import com.auditvault.dto.request.CreateAuditRequest;
import com.auditvault.dto.request.SaveResponseRequest;
import com.auditvault.dto.response.AuditSummaryResponse;
import com.auditvault.entity.*;
import com.auditvault.enums.AuditStatus;
import com.auditvault.exception.ResourceNotFoundException;
import com.auditvault.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditRepository auditRepository;
    private final AuditResponseRepository responseRepository;
    private final TemplateRepository templateRepository;
    private final UserRepository userRepository;

    @Transactional
    public Audit createAudit(CreateAuditRequest req, String userEmail) {
        Template template = templateRepository.findBySlug(req.getTemplateSlug())
                .orElseThrow(() -> new ResourceNotFoundException("Template", "slug", req.getTemplateSlug()));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        Audit audit = Audit.builder()
                .template(template).user(user)
                .title(req.getTitle()).clientName(req.getClientName())
                .dueDate(req.getDueDate())
                .build();
        return auditRepository.save(audit);
    }

    public List<AuditSummaryResponse> getUserAudits(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
        return auditRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(this::toSummary).toList();
    }

    public Audit getAuditById(UUID id) {
        return auditRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Audit", "id", id));
    }

    @Transactional
    public Audit updateStatus(UUID id, AuditStatus status) {
        Audit audit = getAuditById(id);
        audit.setStatus(status);
        return auditRepository.save(audit);
    }

    @Transactional
    public AuditResponse saveResponse(UUID auditId, SaveResponseRequest req) {
        Audit audit = getAuditById(auditId);
        AuditResponse response = responseRepository
                .findByAuditIdAndChecklistItemId(auditId, req.getChecklistItemId())
                .orElse(AuditResponse.builder()
                        .audit(audit)
                        .checklistItem(ChecklistItem.builder().id(req.getChecklistItemId()).build())
                        .build());

        response.setStatus(req.getStatus());
        response.setNotes(req.getNotes());
        response.setEvidenceUrl(req.getEvidenceUrl());
        return responseRepository.save(response);
    }

    public List<AuditResponse> getResponses(UUID auditId) {
        return responseRepository.findByAuditId(auditId);
    }

    private AuditSummaryResponse toSummary(Audit audit) {
        return AuditSummaryResponse.builder()
                .id(audit.getId()).title(audit.getTitle())
                .clientName(audit.getClientName())
                .templateName(audit.getTemplate().getName())
                .status(audit.getStatus()).dueDate(audit.getDueDate())
                .createdAt(audit.getCreatedAt())
                .build();
    }
}
