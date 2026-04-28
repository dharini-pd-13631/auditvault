package com.auditvault.entity;

import com.auditvault.enums.RiskLevel;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "checklist_items")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ChecklistItem {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private TemplateSection section;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(columnDefinition = "TEXT")
    private String guidance;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private RiskLevel riskLevel;

    @Builder.Default
    @Column(nullable = false)
    private Boolean isMandatory = false;

    @Column(nullable = false)
    private Integer orderIndex;
}
