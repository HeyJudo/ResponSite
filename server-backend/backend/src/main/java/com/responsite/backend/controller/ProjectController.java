package com.responsite.backend.controller;

import com.responsite.backend.dto.ProjectDTO;
import com.responsite.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // PUBLIC: view all projects
    @GetMapping
    public List<ProjectDTO> listProjects() {
        return projectService.getAllProjects();
    }

    // PUBLIC: view single project
    @GetMapping("/{id}")
    public ProjectDTO getProject(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    // LGU_STAFF: create project
    @PostMapping
    @PreAuthorize("hasRole('LGU_STAFF')")
    public ProjectDTO createProject(@RequestBody ProjectDTO dto) {
        return projectService.createProject(dto);
    }

    // LGU_STAFF: update project
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('LGU_STAFF')")
    public ProjectDTO updateProject(@PathVariable Long id, @RequestBody ProjectDTO dto) {
        return projectService.updateProject(id, dto);
    }
}
