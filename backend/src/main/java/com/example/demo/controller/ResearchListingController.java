package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins = "http://localhost:3000")
public class ResearchListingController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/test")
    public String test() {
        return "Controller is working";
    }

    @PostMapping("/add")
    public ResponseEntity<?> addResearch(@RequestBody Map<String, Object> listing) {
        System.out.println("Step 1: Starting research addition process");
        try {
            System.out.println("Received listing data: " + listing);
            
            // Check if email exists in request
            if (listing.get("email") == null) {
                return ResponseEntity.badRequest().body("Email is missing from request");
            }
            
            String email = listing.get("email").toString();
            System.out.println("Step 2: Looking up user with email: " + email);
            
            // Debug the SQL query
            String findUserSql = "SELECT id FROM users WHERE email = ?";
            System.out.println("Step 3: Executing SQL: " + findUserSql + " with email: " + email);
            
            Long userId = null;
            try {
                userId = jdbcTemplate.queryForObject(findUserSql, Long.class, email);
                System.out.println("Step 4: User ID found: " + userId);
            } catch (Exception e) {
                System.out.println("Step 4 ERROR: Failed to find user. Error: " + e.getMessage());
                return ResponseEntity.badRequest().body("User not found with email: " + email);
            }
            
            if (userId == null) {
                System.out.println("Step 5 ERROR: No user found for email: " + email);
                return ResponseEntity.badRequest().body("No user found with email: " + email);
            }
            
            System.out.println("Step 5: Inserting research listing with user_id: " + userId);
            String sql = "INSERT INTO research_listings (user_id, project_name, description, start_date, needs_students, needs_sponsors) VALUES (?, ?, ?, ?, ?, ?)";
            
            jdbcTemplate.update(sql,
                userId,
                listing.get("project_name"),
                listing.get("description"),
                listing.get("start_date"),
                listing.get("needs_students"),
                listing.get("needs_sponsors")
            );
            
            System.out.println("Step 6: Research listing added successfully");
            return ResponseEntity.ok().body("Research listing added successfully");
        } catch (Exception e) {
            System.out.println("FINAL ERROR: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error adding research listing: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<Map<String, Object>> getAllListings() {
        String sql = "SELECT rl.*, u.name as researcher_name " +
                     "FROM research_listings rl " +
                     "LEFT JOIN users u ON rl.user_id = u.id " +
                     "ORDER BY rl.listing_id";
        return jdbcTemplate.queryForList(sql);
    }
} 