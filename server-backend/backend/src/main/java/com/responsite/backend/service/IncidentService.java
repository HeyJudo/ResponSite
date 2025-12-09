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
}
