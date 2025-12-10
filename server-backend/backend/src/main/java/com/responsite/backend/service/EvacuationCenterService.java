package com.responsite.backend.service;

import com.responsite.backend.entity.EvacuationCenter;
import com.responsite.backend.Repository.EvacuationCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EvacuationCenterService {
    @Autowired
    private EvacuationCenterRepository repository;

    // 1. READ: Residents view all centers
    public List<EvacuationCenter> getAllCenters() {
        return repository.findAll();
    }

    // 2. CREATE: LGU adds a new center
    public EvacuationCenter addCenter(EvacuationCenter center) {
        return repository.save(center);
    }

    // 3. UPDATE STATUS: LGU Opens/Closes a center
    public EvacuationCenter updateStatus(Long id, String newStatus) {
        EvacuationCenter center = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Center not found"));
        
        // Validate status
        if (!newStatus.equals("OPEN") && !newStatus.equals("CLOSED") && !newStatus.equals("FULL")) {
            throw new RuntimeException("Invalid status. Use OPEN, CLOSED, or FULL.");
        }

        center.setStatus(newStatus);
        return repository.save(center);
    }
    
    // 4. DELETE: LGU removes a center
    public void deleteCenter(Long id) {
        repository.deleteById(id);
    }
}
