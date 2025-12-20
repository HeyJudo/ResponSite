package com.responsite.backend.controller;

import com.responsite.backend.dto.ProjectDTO;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.ProjectService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // PUBLIC: view all projects (No login required)
    @GetMapping
    public ResponseEntity<List<ProjectDTO>> listProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    // PUBLIC: view single project (No login required)
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        ProjectDTO project = projectService.getProject(id);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project);
    }

    // RESTRICTED: LGU_STAFF or ADMIN only - Create project
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectDTO dto, HttpSession session) {
        // Manual Session Auth Check
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
        }
        if (!user.getRole().equals("STAFF") && !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only LGU Staff can create projects");
        }

        ProjectDTO created = projectService.createProject(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // RESTRICTED: LGU_STAFF or ADMIN only - Update project progress
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody ProjectDTO dto, HttpSession session) {
        // Manual Session Auth Check
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first");
        }
        if (!user.getRole().equals("STAFF") && !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only LGU Staff can update projects");
        }

        ProjectDTO updated = projectService.updateProject(id, dto);
        return ResponseEntity.ok(updated);
    }
}
