package com.auditvault.repository;

import com.auditvault.entity.SectorLaw;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.auditvault.entity.Law;
import java.util.List;
import java.util.UUID;

public interface SectorLawRepository extends JpaRepository<SectorLaw, UUID> {
    @Query("SELECT sl.law FROM SectorLaw sl WHERE sl.sector.code = :sectorCode")
    List<Law> findLawsBySectorCode(String sectorCode);
}
