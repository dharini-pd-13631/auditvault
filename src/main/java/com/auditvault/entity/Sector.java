package com.auditvault.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "sectors")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Sector {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 30)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    private String description;

    private String icon;

    @CreationTimestamp
    private Instant createdAt;
}
