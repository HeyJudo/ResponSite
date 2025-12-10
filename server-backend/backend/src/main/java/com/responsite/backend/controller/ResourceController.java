package com.responsite.backend.controller;

import com.responsite.backend.entity.Resource;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.ResourceService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ResourceController {
    @Autowired
    private ResourceService resourceService;

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
     * 1. GET ALL RESOURCES (View Inventory)
     * Access: STAFF and ADMIN only (Residents cannot see internal inventory)
     * Usage: GET /api/resources
     */
    @GetMapping
    public ResponseEntity<?> getAll(HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");
        if ("RESIDENT".equals(user.getRole())) return ResponseEntity.status(403).body("Access Denied");

        return ResponseEntity.ok(resourceService.getAllResources());
    }

    /**
     * 2. ADD RESOURCE (Add Item to Inventory)
     * Access: STAFF and ADMIN only
     * Usage: POST /api/resources
     */
    @PostMapping
    public ResponseEntity<?> add(@RequestBody Resource resource, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");
        if ("RESIDENT".equals(user.getRole())) return ResponseEntity.status(403).body("Access Denied");

        return ResponseEntity.ok(resourceService.addResource(resource));
    }

    /**
     * 3. UPDATE RESOURCE (Update Item in Inventory)
     * Access: STAFF and ADMIN only
     * Usage: PUT /api/resources/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Resource resource, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");
        if ("RESIDENT".equals(user.getRole())) return ResponseEntity.status(403).body("Access Denied");

        try {
            return ResponseEntity.ok(resourceService.updateResource(id, resource));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 4. DELETE RESOURCE (Remove Item from Inventory)
     * Access: STAFF and ADMIN only
     * Usage: DELETE /api/resources/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return ResponseEntity.status(401).body("Please login first");
        if ("RESIDENT".equals(user.getRole())) return ResponseEntity.status(403).body("Access Denied");

        resourceService.deleteResource(id);
        return ResponseEntity.ok("Item removed");
    }
}
