package com.auditvault.controller;

import com.auditvault.entity.Law;
import com.auditvault.entity.Sector;
import com.auditvault.service.SectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sectors")
@RequiredArgsConstructor
public class SectorController {

    private final SectorService sectorService;

    @GetMapping
    public ResponseEntity<List<Sector>> listSectors() {
        return ResponseEntity.ok(sectorService.getAllSectors());
    }

    @GetMapping("/{code}")
    public ResponseEntity<Sector> getSector(@PathVariable String code) {
        return ResponseEntity.ok(sectorService.getByCode(code));
    }

    @GetMapping("/{code}/laws")
    public ResponseEntity<List<Law>> getLawsBySector(@PathVariable String code) {
        return ResponseEntity.ok(sectorService.getLawsBySector(code));
    }
}
