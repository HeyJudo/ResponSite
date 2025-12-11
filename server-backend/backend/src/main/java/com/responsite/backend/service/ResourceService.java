package com.responsite.backend.service;

import com.responsite.backend.dto.ResourceDTO;
import com.responsite.backend.entity.Resource;
import com.responsite.backend.Repository.ResourceRepository;
import com.responsite.backend.util.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;

    // 1. READ: Get Inventory
    public List<ResourceDTO> getAllResources() {
        List<Resource> resources = resourceRepository.findAll();
        return EntityMapper.toResourceDtoList(resources);
    }

    // 2. CREATE: Add new item
    public ResourceDTO addResource(ResourceDTO resourceDTO) {
        // Convert DTO to Entity
        Resource resource = EntityMapper.toEntity(resourceDTO);
        resource.setId(null); // Ensure new record

        // Initial status check
        updateStatusBasedOnQuantity(resource);

        Resource savedResource = resourceRepository.save(resource);
        return EntityMapper.toDto(savedResource);
    }

    // 3. UPDATE: Edit details or Update Stock
    public ResourceDTO updateResource(Long id, ResourceDTO updatedDTO) {
        Resource resource = resourceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Item not found"));

        // Update fields from DTO
        resource.setName(updatedDTO.getName());
        resource.setCategory(updatedDTO.getCategory());
        resource.setLocation(updatedDTO.getLocation());
        resource.setUnit(updatedDTO.getUnit());
        resource.setQuantity(updatedDTO.getQuantity());
        resource.setReorderLevel(updatedDTO.getReorderLevel());

        // Auto-calculate status
        updateStatusBasedOnQuantity(resource);

        Resource savedResource = resourceRepository.save(resource);
        return EntityMapper.toDto(savedResource);
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
