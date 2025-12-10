package com.responsite.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (Crucial for Postman/Thunder Client testing)
            .csrf(csrf -> csrf.disable())
            
            // 2. ALLOW EVERYTHING (The Fix)
            // We turn off the automatic "Bouncer" so your IncidentController can do the checking.
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // Allow ALL endpoints
                .anyRequest().permitAll()
            )
            
            // 3. Disable default login forms
            .httpBasic(basic -> basic.disable())
            .formLogin(login -> login.disable());

        return http.build();
    }

    // 4. CORS Configuration (Keep this for React)
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); 
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}