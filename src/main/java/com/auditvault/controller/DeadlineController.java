package com.auditvault.controller;

import com.auditvault.dto.response.DeadlineResponse;
import com.auditvault.service.DeadlineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/deadlines")
@RequiredArgsConstructor
public class DeadlineController {

    private final DeadlineService deadlineService;

    @GetMapping
    public ResponseEntity<List<DeadlineResponse>> listDeadlines() {
        return ResponseEntity.ok(deadlineService.getAllDeadlines());
    }
}
