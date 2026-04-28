package com.auditvault.repository;

import com.auditvault.entity.Law;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface LawRepository extends JpaRepository<Law, UUID> {
    Optional<Law> findBySlug(String slug);
}
