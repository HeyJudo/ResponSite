package com.responsite.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.responsite.backend.Repository.IncidentRepository;
import com.responsite.backend.Repository.UserRepository;
import com.responsite.backend.dto.IncidentRequestDTO;
import com.responsite.backend.dto.IncidentResponseDTO;
import com.responsite.backend.entity.Incident;
import com.responsite.backend.entity.User;
import com.responsite.backend.util.EntityMapper;

@Service
public class IncidentService {
    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private UserRepository userRepository;

    // 1. CREATE: Resident submits a report
    public IncidentResponseDTO createIncident(IncidentRequestDTO requestDTO, Long userId) {
        // Find the user who reported this
        User reporter = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Convert DTO to Entity
        Incident incident = EntityMapper.toEntity(requestDTO);
        incident.setReporter(reporter); // Link report to user
        incident.setStatus("PENDING");  // Default status
        incident.setTimestamp(LocalDateTime.now()); // Set time to NOW

        Incident savedIncident = incidentRepository.save(incident);
        return EntityMapper.toDto(savedIncident);
    }

    // 2. READ: Staff sees ALL reports
    public List<IncidentResponseDTO> getAllIncidents() {
        List<Incident> incidents = incidentRepository.findAll();
        return EntityMapper.toIncidentDtoList(incidents);
    }

    // 3. READ: Resident sees ONLY their reports
    public List<IncidentResponseDTO> getMyIncidents(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<Incident> incidents = incidentRepository.findByReporter(user);
        return EntityMapper.toIncidentDtoList(incidents);
    }

    // 4. UPDATE: Staff updates status (Pending -> Resolved)
    public IncidentResponseDTO updateStatus(Long id, String newStatus) {
        Optional<Incident> incidentOpt = incidentRepository.findById(id);

        if (incidentOpt.isPresent()) {
            Incident incident = incidentOpt.get();
            incident.setStatus(newStatus);
            
            // Set date when status changes to IN_PROGRESS
            if ("IN_PROGRESS".equals(newStatus) && incident.getInProgressDate() == null) {
                incident.setInProgressDate(LocalDateTime.now());
            }
            
            // Set date when status changes to RESOLVED
            if ("RESOLVED".equals(newStatus)) {
                incident.setResolvedDate(LocalDateTime.now());
            }
            
            Incident savedIncident = incidentRepository.save(incident);
            return EntityMapper.toDto(savedIncident);
        }
        throw new RuntimeException("Incident not found with ID: " + id);
    }

    // 5. CANCEL: Resident cancels their own report
    public IncidentResponseDTO cancelReport(Long id, Long userId) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));

        // Security Check
        // Compare the ID of the reporter with the ID of the logged-in user
        if (!incident.getReporter().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to cancel this report");
        }

        // Logic Check: Can only cancel if PENDING
        // If staff is already working on it (IN_PROGRESS), you can't cancel anymore.
        if (!"PENDING".equals(incident.getStatus())) {
            throw new RuntimeException("Cannot cancel report that is already being processed");
        }

        incident.setStatus("CANCELLED");
        Incident savedIncident = incidentRepository.save(incident);
        return EntityMapper.toDto(savedIncident);
    }

    // 6. DELETE: Admin hard delete (For cleaning up spam/test data)
    public void deleteIncident(Long id) {
        if (incidentRepository.existsById(id)) {
            incidentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Incident not found");
        }
    }

    // 7. ASSIGN RESPONDENT: Staff/Admin assigns a respondent to an incident
    public IncidentResponseDTO assignRespondent(Long id, String respondentName) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));

        incident.setAssignedTo(respondentName);
        
        // Automatically set status to IN_PROGRESS if it's PENDING
        if ("PENDING".equals(incident.getStatus())) {
            incident.setStatus("IN_PROGRESS");
            incident.setInProgressDate(LocalDateTime.now());
        }

        Incident savedIncident = incidentRepository.save(incident);
        return EntityMapper.toDto(savedIncident);
    }

    // 8. RESOLVE WITH NOTES: Mark incident as resolved with resolution notes
    public IncidentResponseDTO resolveIncidentWithNotes(Long id, String resolutionNotes) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));

        incident.setStatus("RESOLVED");
        incident.setResolvedDate(LocalDateTime.now());
        incident.setResolutionNotes(resolutionNotes);

        Incident savedIncident = incidentRepository.save(incident);
        return EntityMapper.toDto(savedIncident);
    }
}