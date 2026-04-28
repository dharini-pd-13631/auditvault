package com.auditvault.service;

import com.auditvault.dto.response.DeadlineResponse;
import com.auditvault.entity.Deadline;
import com.auditvault.repository.DeadlineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeadlineService {

    private final DeadlineRepository deadlineRepository;

    public List<DeadlineResponse> getAllDeadlines() {
        return deadlineRepository.findAllByOrderByDueDateAsc()
                .stream().map(this::toResponse).toList();
    }

    private DeadlineResponse toResponse(Deadline d) {
        return DeadlineResponse.builder()
                .id(d.getId()).name(d.getName())
                .description(d.getDescription())
                .dueDate(d.getDueDate()).urgency(d.getUrgency())
                .build();
    }
}
