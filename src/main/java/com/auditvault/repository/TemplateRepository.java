package com.auditvault.repository;

import com.auditvault.entity.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TemplateRepository extends JpaRepository<Template, UUID> {
    @Query("SELECT DISTINCT t FROM Template t LEFT JOIN FETCH t.sections s LEFT JOIN FETCH s.items WHERE t.slug = :slug")
    Optional<Template> findBySlug(String slug);

    @Query("SELECT DISTINCT t FROM Template t LEFT JOIN FETCH t.sections s LEFT JOIN FETCH s.items WHERE t.isActive = true")
    List<Template> findByIsActiveTrue();
}
