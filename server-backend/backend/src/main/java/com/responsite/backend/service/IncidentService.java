package com.responsite.backend.service;

import com.responsite.backend.entity.Incident;
import com.responsite.backend.entity.User;
import com.responsite.backend.Repository.IncidentRepository;
import com.responsite.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IncidentService {
     @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private UserRepository userRepository;

    // 1. CREATE: Resident submits a report
    public Incident createIncident(Incident incident, Long userId) {
        // Find the user who reported this
        User reporter = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        incident.setReporter(reporter); // Link report to user
        incident.setStatus("PENDING");  // Default status
        incident.setTimestamp(LocalDateTime.now()); // Set time to NOW
        
        return incidentRepository.save(incident);
    }

    // 2. READ: Staff sees ALL reports
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    // 3. READ: Resident sees ONLY their reports
    public List<Incident> getMyIncidents(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return incidentRepository.findByReporter(user); // Custom query we made earlier!
    }

    // 4. UPDATE: Staff updates status (Pending -> Resolved)
    public Incident updateStatus(Long id, String newStatus) {
        Optional<Incident> incidentOpt = incidentRepository.findById(id);
        
        if (incidentOpt.isPresent()) {
            Incident incident = incidentOpt.get();
            incident.setStatus(newStatus);
            return incidentRepository.save(incident);
        }
        throw new RuntimeException("Incident not found with ID: " + id);
    }
    public Incident cancelReport(Long id, Long userId) {
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
        return incidentRepository.save(incident);
    }

    // 6. DELETE: Admin hard delete (For cleaning up spam/test data)
    public void deleteIncident(Long id) {
        if (incidentRepository.existsById(id)) {
            incidentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Incident not found");
        }
    }
}
