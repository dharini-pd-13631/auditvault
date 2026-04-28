package com.auditvault.controller;

import com.auditvault.entity.Template;
import com.auditvault.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/templates")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping
    public ResponseEntity<List<Template>> listTemplates() {
        return ResponseEntity.ok(templateService.getActiveTemplates());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Template> getTemplate(@PathVariable String slug) {
        return ResponseEntity.ok(templateService.getBySlug(slug));
    }
}
