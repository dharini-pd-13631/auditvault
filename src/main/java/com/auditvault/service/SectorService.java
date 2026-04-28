package com.auditvault.service;

import com.auditvault.entity.Law;
import com.auditvault.entity.Sector;
import com.auditvault.exception.ResourceNotFoundException;
import com.auditvault.repository.SectorLawRepository;
import com.auditvault.repository.SectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SectorService {

    private final SectorRepository sectorRepository;
    private final SectorLawRepository sectorLawRepository;

    public List<Sector> getAllSectors() {
        return sectorRepository.findAll();
    }

    public Sector getByCode(String code) {
        return sectorRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Sector", "code", code));
    }

    public List<Law> getLawsBySector(String sectorCode) {
        return sectorLawRepository.findLawsBySectorCode(sectorCode);
    }
}
