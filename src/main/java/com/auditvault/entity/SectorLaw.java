package com.auditvault.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "sector_laws", uniqueConstraints = @UniqueConstraint(columnNames = {"sector_id", "law_id"}))
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class SectorLaw {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sector_id", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Sector sector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "law_id", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Law law;
}
