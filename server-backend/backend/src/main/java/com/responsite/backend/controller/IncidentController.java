package com.responsite.backend.controller;

import com.responsite.backend.entity.Incident;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.IncidentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class IncidentController {
    @Autowired
    private IncidentService incidentService;

    // Helper: Check if user is logged in
    private User getSessionUser(HttpSession session) {
        return (User) session.getAttribute("user");
    }

    // 1. CREATE (Resident)
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Incident incident, HttpSession session) {
        User currentUser = getSessionUser(session);
        if (currentUser == null) return ResponseEntity.status(401).body("Please login first");

        return ResponseEntity.ok(incidentService.createIncident(incident, currentUser.getId()));
    }

    // 2. GET ALL (Staff Only - ideally)
    @GetMapping
    public ResponseEntity<?> getAll(HttpSession session) {
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    // 3. GET MY REPORTS (Resident)
    @GetMapping("/my-reports")
    public ResponseEntity<?> getMyReports(HttpSession session) {
        User currentUser = getSessionUser(session);
        if (currentUser == null) return ResponseEntity.status(401).body("Please login first");

        return ResponseEntity.ok(incidentService.getMyIncidents(currentUser.getId()));
    }

    // 4. UPDATE STATUS (Staff)
    // Usage: PUT /api/incidents/5/status?status=RESOLVED
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            return ResponseEntity.ok(incidentService.updateStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // 5. CANCEL (Resident)
    // Usage: PUT /api/incidents/1/cancel
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id, HttpSession session) {
        User currentUser = getSessionUser(session);
        if (currentUser == null) return ResponseEntity.status(401).body("Please login first");
        
        try {
            return ResponseEntity.ok(incidentService.cancelReport(id, currentUser.getId()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 6. DELETE (Admin)
    // Usage: DELETE /api/incidents/1
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            incidentService.deleteIncident(id);
            return ResponseEntity.ok("Incident deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
