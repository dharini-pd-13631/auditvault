package com.auditvault.entity;

import com.auditvault.enums.Urgency;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "deadlines")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Deadline {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Urgency urgency;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "law_id")
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Law law;

    @CreationTimestamp
    private Instant createdAt;
}
