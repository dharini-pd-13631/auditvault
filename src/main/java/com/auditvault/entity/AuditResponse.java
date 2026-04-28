package com.auditvault.entity;

import com.auditvault.enums.ResponseStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "audit_responses", uniqueConstraints = @UniqueConstraint(columnNames = {"audit_id", "checklist_item_id"}))
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class AuditResponse {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "audit_id", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Audit audit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_item_id", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private ChecklistItem checklistItem;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false, length = 20)
    private ResponseStatus status = ResponseStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String evidenceUrl;

    @UpdateTimestamp
    private Instant updatedAt;
}
