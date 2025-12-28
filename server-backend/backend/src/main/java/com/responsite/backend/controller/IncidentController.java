package com.responsite.backend.controller;

import com.responsite.backend.dto.IncidentRequestDTO;
import com.responsite.backend.dto.IncidentResponseDTO;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.IncidentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class IncidentController {
    @Autowired
    private IncidentService incidentService;

    // ==================== HELPER METHOD ====================
    /**
     * Retrieves the currently logged-in user from the session.
     * @param session The HTTP session
     * @return User object if logged in, null otherwise
     */
    private User getSessionUser(HttpSession session) {
        return (User) session.getAttribute("user");
    }

    // ==================== ENDPOINTS ====================

    /**
     * 1. CREATE INCIDENT
     * Access: Login Required (any authenticated user)
     * Usage: POST /api/incidents
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody IncidentRequestDTO requestDTO, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");

        IncidentResponseDTO response = incidentService.createIncident(requestDTO, user.getId());
        return ResponseEntity.ok(response);
    }

    /**
     * 2. GET ALL INCIDENTS
     * Access: STAFF and ADMIN only (Residents cannot view all reports)
     * Usage: GET /api/incidents
     */
    @GetMapping
    public ResponseEntity<?> getAll(HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");
        if ("RESIDENT".equals(user.getRole())) return ResponseEntity.status(403).body("Access Denied");

        List<IncidentResponseDTO> incidents = incidentService.getAllIncidents();
        return ResponseEntity.ok(incidents);
    }

    /**
     * 3. GET MY REPORTS
     * Access: Login Required (any authenticated user)
     * Usage: GET /api/incidents/my-reports
     */
    @GetMapping("/my-reports")
    public ResponseEntity<?> getMyReports(HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");

        List<IncidentResponseDTO> incidents = incidentService.getMyIncidents(user.getId());
        return ResponseEntity.ok(incidents);
    }

    /**
     * 4. UPDATE INCIDENT STATUS
     * Access: STAFF and ADMIN only (Residents cannot update status)
     * Usage: PUT /api/incidents/5/status?status=RESOLVED
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");
        if ("RESIDENT".equals(user.getRole())) return ResponseEntity.status(403).body("Access Denied");

        try {
            IncidentResponseDTO response = incidentService.updateStatus(id, status);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 5. CANCEL INCIDENT (by owner)
     * Access: Login Required (ownership check done in service layer)
     * Usage: PUT /api/incidents/1/cancel
     */
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");

        try {
            IncidentResponseDTO response = incidentService.cancelReport(id, user.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 6. DELETE INCIDENT (hard delete)
     * Access: ADMIN ONLY (Staff and Residents cannot hard delete)
     * Usage: DELETE /api/incidents/1
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");
        if (!"ADMIN".equals(user.getRole())) return ResponseEntity.status(403).body("Access Denied: Admin only");

        try {
            incidentService.deleteIncident(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Incident deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
