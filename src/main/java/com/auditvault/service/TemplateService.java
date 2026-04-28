package com.auditvault.service;

import com.auditvault.entity.Template;
import com.auditvault.exception.ResourceNotFoundException;
import com.auditvault.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    public List<Template> getActiveTemplates() {
        return templateRepository.findByIsActiveTrue();
    }

    public Template getBySlug(String slug) {
        return templateRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Template", "slug", slug));
    }
}
