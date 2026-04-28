package com.auditvault.repository;

import com.auditvault.entity.Deadline;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface DeadlineRepository extends JpaRepository<Deadline, UUID> {
    List<Deadline> findByDueDateAfterOrderByDueDateAsc(LocalDate date);
    List<Deadline> findAllByOrderByDueDateAsc();
}
