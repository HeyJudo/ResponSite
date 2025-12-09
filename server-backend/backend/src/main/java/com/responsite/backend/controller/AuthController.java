package com.responsite.backend.controller;
import com.responsite.backend.entity.User;
import com.responsite.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") 

public class AuthController {
    @Autowired
    private UserService userService;

    // Endpoint: POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User newUser = userService.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint: POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest, HttpSession session) {
        User user = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
        
        if (user != null) {
            // SUCCESS: Store user in Session (The Magic Cookie)
            // Spring automatically sends a "JSESSIONID" cookie to the browser/Postman
            session.setAttribute("user", user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Invalid Username or Password");
        }
    }

    // Endpoint: POST /api/auth/logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // Destroys the session cookie
        return ResponseEntity.ok("Logged out successfully");
    }
    
    // Endpoint: GET /api/auth/check (Useful for Frontend to check if logged in)
    @GetMapping("/check")
    public ResponseEntity<?> checkSession(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("Not logged in");
    }
}
