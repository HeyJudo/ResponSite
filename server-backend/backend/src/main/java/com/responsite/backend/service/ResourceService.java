package com.responsite.backend.service;


import com.responsite.backend.entity.Resource;
import com.responsite.backend.Repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;

    // 1. READ: Get Inventory
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    // 2. CREATE: Add new item
    public Resource addResource(Resource resource) {
        // Initial status check
        updateStatusBasedOnQuantity(resource);
        return resourceRepository.save(resource);
    }

    // 3. UPDATE: Edit details or Update Stock
    public Resource updateResource(Long id, Resource updatedInfo) {
        Resource resource = resourceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Item not found"));

        // Update fields
        resource.setName(updatedInfo.getName());
        resource.setCategory(updatedInfo.getCategory());
        resource.setLocation(updatedInfo.getLocation());
        resource.setUnit(updatedInfo.getUnit());
        resource.setQuantity(updatedInfo.getQuantity());
        resource.setReorderLevel(updatedInfo.getReorderLevel());

        // Auto-calculate status
        updateStatusBasedOnQuantity(resource);

        return resourceRepository.save(resource);
    }

    // Helper Method: Update status based on quantity and reorder level
    private void updateStatusBasedOnQuantity(Resource resource) {
        if (resource.getQuantity() <= 0) {
            resource.setStatus("DEPLETED");
        } else if (resource.getQuantity() <= resource.getReorderLevel()) {
            resource.setStatus("LOW_STOCK");
        } else {
            resource.setStatus("AVAILABLE");
        }
    }
    
    // 4. DELETE (Soft Delete: Just mark as Depleted/Archived)
    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }
}
