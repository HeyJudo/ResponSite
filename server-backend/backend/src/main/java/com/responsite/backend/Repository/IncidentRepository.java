package com.responsite.backend.Repository;

import com.responsite.backend.entity.Incident;
import com.responsite.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByReporter(User reporter);
}
