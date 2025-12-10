package com.responsite.backend.controller;

import com.responsite.backend.entity.Resource;
import com.responsite.backend.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

public class ResourceController {
     @Autowired
    private ResourceService resourceService;

    // 1. Get Inventory
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    // 2. Add Item (LGU Staff)
    @PostMapping
    public ResponseEntity<?> add(@RequestBody Resource resource) {
        return ResponseEntity.ok(resourceService.addResource(resource));
    }

    // 3. Update Item (LGU Staff)
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Resource resource) {
        try {
            return ResponseEntity.ok(resourceService.updateResource(id, resource));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // 4. Delete Item (Admin/Staff)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok("Item removed");
    }
}
