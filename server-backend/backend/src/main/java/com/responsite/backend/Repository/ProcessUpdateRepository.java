package com.responsite.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.responsite.backend.entity.ProcessUpdate;
import com.responsite.backend.entity.Project;

public interface ProcessUpdateRepository extends JpaRepository<ProcessUpdate, Long> {
    List<ProcessUpdate> findByProjectOrderByTimestampDesc(Project project);
}