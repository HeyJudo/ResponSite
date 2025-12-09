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
            // 1. Disable CSRF (Common for REST APIs during dev)
            .csrf(csrf -> csrf.disable())
            
            // 2. Configure URL Permissions
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Allow Login/Register without logging in
                .anyRequest().authenticated()               // Lock everything else
            )
            
            // 3. Enable standard HTTP Basic Auth (for simplicity if needed) or just rely on custom endpoints
            .httpBasic(basic -> basic.disable())
            .formLogin(login -> login.disable()); // Disable default HTML login page

        return http.build();
    }

    // 4. CORS Configuration (Allows React on port 5173 to talk to Spring on 8080)
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // Allow sending Cookies/Session
        config.setAllowedOrigins(List.of("http://localhost:5173")); // Trust Frontend
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
