package com.responsite.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.responsite.backend.dto.EvacuationCenterDTO;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.EvacuationCenterService;

import jakarta.servlet.http.HttpSession;

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
        List<EvacuationCenterDTO> centers = service.getAllCenters();
        return ResponseEntity.ok(centers);
    }

    // 2. Add Center (SECURE - Login Required)
    @PostMapping
    public ResponseEntity<?> add(@RequestBody EvacuationCenterDTO centerDTO, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "RESIDENT".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Access Denied: Staff only");
        }

        EvacuationCenterDTO savedCenter = service.addCenter(centerDTO);
        return ResponseEntity.ok(savedCenter);
    }

    // 3. Update Status (SECURE - Login Required)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "RESIDENT".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Access Denied: Staff only");
        }

        try {
            EvacuationCenterDTO updatedCenter = service.updateStatus(id, status);
            return ResponseEntity.ok(updatedCenter);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 3.5. Update Center (SECURE - Login Required)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCenter(@PathVariable Long id, @RequestBody EvacuationCenterDTO centerDTO, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "RESIDENT".equals(user.getRole())) {
            return ResponseEntity.status(403).body("Access Denied: Staff only");
        }

        try {
            EvacuationCenterDTO updatedCenter = service.updateCenter(id, centerDTO);
            return ResponseEntity.ok(updatedCenter);
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
