package com.auditvault.repository;

import com.auditvault.entity.AuditResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AuditResponseRepository extends JpaRepository<AuditResponse, UUID> {
    List<AuditResponse> findByAuditId(UUID auditId);
    Optional<AuditResponse> findByAuditIdAndChecklistItemId(UUID auditId, UUID checklistItemId);
}
