package com.auditvault.repository;

import com.auditvault.entity.Audit;
import com.auditvault.enums.AuditStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AuditRepository extends JpaRepository<Audit, UUID> {
    List<Audit> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<Audit> findByStatus(AuditStatus status);
    long countByUserId(UUID userId);
    long countByUserIdAndStatus(UUID userId, AuditStatus status);
}
