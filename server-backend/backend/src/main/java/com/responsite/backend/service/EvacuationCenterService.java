package com.responsite.backend.service;

import com.responsite.backend.dto.EvacuationCenterDTO;
import com.responsite.backend.entity.EvacuationCenter;
import com.responsite.backend.Repository.EvacuationCenterRepository;
import com.responsite.backend.util.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvacuationCenterService {
    @Autowired
    private EvacuationCenterRepository repository;

    // 1. READ: Residents view all centers
    public List<EvacuationCenterDTO> getAllCenters() {
        List<EvacuationCenter> centers = repository.findAll();
        return EntityMapper.toEvacuationCenterDtoList(centers);
    }

    // 2. CREATE: LGU adds a new center
    public EvacuationCenterDTO addCenter(EvacuationCenterDTO centerDTO) {
        EvacuationCenter center = EntityMapper.toEntity(centerDTO);
        center.setId(null); // Ensure new record
        EvacuationCenter savedCenter = repository.save(center);
        return EntityMapper.toDto(savedCenter);
    }

    // 3. UPDATE STATUS: LGU Opens/Closes a center
    public EvacuationCenterDTO updateStatus(Long id, String newStatus) {
        EvacuationCenter center = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Center not found"));

        // Validate status
        if (!newStatus.equals("OPEN") && !newStatus.equals("CLOSED") && !newStatus.equals("FULL")) {
            throw new RuntimeException("Invalid status. Use OPEN, CLOSED, or FULL.");
        }

        center.setStatus(newStatus);
        EvacuationCenter savedCenter = repository.save(center);
        return EntityMapper.toDto(savedCenter);
    }

    // 4. DELETE: LGU removes a center
    public void deleteCenter(Long id) {
        repository.deleteById(id);
    }
}
