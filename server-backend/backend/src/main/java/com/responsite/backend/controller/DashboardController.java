package com.responsite.backend.controller;

import com.responsite.backend.dto.DashboardStatsDTO;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.DashboardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for Dashboard & Analytics (Module 5)
 * Provides aggregated statistics for the dashboard.
 */
@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /**
     * Get dashboard statistics for the logged-in user.
     * 
     * Endpoint: GET /api/dashboard/stats
     * Security: Requires authenticated session
     * 
     * @param session The HTTP session containing the logged-in user
     * @return ResponseEntity with DashboardStatsDTO or 401 if not authenticated
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getStats(HttpSession session) {
        // Check if user is logged in using session-based authentication
        User currentUser = (User) session.getAttribute("user");
        
        if (currentUser == null) {
            return ResponseEntity.status(401).body("Unauthorized: Please log in to access dashboard statistics");
        }

        // Get aggregated statistics
        DashboardStatsDTO stats = dashboardService.getStats(currentUser);
        
        return ResponseEntity.ok(stats);
    }
}
