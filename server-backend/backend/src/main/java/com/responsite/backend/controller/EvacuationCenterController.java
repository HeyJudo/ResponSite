package com.responsite.backend.controller;

import com.responsite.backend.entity.EvacuationCenter;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.EvacuationCenterService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/evacuation-centers")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")


public class EvacuationCenterController {
    @Autowired
    private EvacuationCenterService service;

    //Helper to get the logged-in user
    private User getSessionUser(HttpSession session) {
        return (User) session.getAttribute("user");
    }

    // 1. View List (PUBLIC - Stays Open)
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAllCenters());
    }

    // 2. Add Center (SECURE - Login Required)
    @PostMapping
    public ResponseEntity<?> add(@RequestBody EvacuationCenter center, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "RESIDENT".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Access Denied: Staff only");
        }
        
        return ResponseEntity.ok(service.addCenter(center));
    }

    // 3. Update Status (SECURE - Login Required)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "RESIDENT".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Access Denied: Staff only");
        }

        try {
            return ResponseEntity.ok(service.updateStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 4. Delete (SECURE - Login Required)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "RESIDENT".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Access Denied: Staff only");
        }

        service.deleteCenter(id);
        return ResponseEntity.ok("Evacuation Center removed");
    }
}
