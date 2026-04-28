package com.auditvault.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "template_sections")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class TemplateSection {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Template template;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false)
    private Integer orderIndex;

    @Builder.Default
    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<ChecklistItem> items = new ArrayList<>();
}
