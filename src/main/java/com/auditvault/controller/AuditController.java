package com.auditvault.controller;

import com.auditvault.dto.request.CreateAuditRequest;
import com.auditvault.dto.request.SaveResponseRequest;
import com.auditvault.dto.response.AuditSummaryResponse;
import com.auditvault.entity.Audit;
import com.auditvault.entity.AuditResponse;
import com.auditvault.enums.AuditStatus;
import com.auditvault.service.AuditService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/audits")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService auditService;

    @PostMapping
    public ResponseEntity<Audit> createAudit(@Valid @RequestBody CreateAuditRequest request,
                                             Authentication auth) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(auditService.createAudit(request, auth.getName()));
    }

    @GetMapping
    public ResponseEntity<List<AuditSummaryResponse>> listAudits(Authentication auth) {
        return ResponseEntity.ok(auditService.getUserAudits(auth.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Audit> getAudit(@PathVariable UUID id) {
        return ResponseEntity.ok(auditService.getAuditById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Audit> updateStatus(@PathVariable UUID id,
                                              @RequestParam AuditStatus status) {
        return ResponseEntity.ok(auditService.updateStatus(id, status));
    }

    @PostMapping("/{id}/responses")
    public ResponseEntity<AuditResponse> saveResponse(@PathVariable UUID id,
                                                      @Valid @RequestBody SaveResponseRequest request) {
        return ResponseEntity.ok(auditService.saveResponse(id, request));
    }

    @GetMapping("/{id}/responses")
    public ResponseEntity<List<AuditResponse>> getResponses(@PathVariable UUID id) {
        return ResponseEntity.ok(auditService.getResponses(id));
    }
}
