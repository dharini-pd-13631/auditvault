package com.auditvault.repository;

import com.auditvault.entity.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface SectorRepository extends JpaRepository<Sector, UUID> {
    Optional<Sector> findByCode(String code);
}
