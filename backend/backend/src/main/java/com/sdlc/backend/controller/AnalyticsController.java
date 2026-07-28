package com.sdlc.backend.controller;

import com.sdlc.backend.config.JwtUtil;
import com.sdlc.backend.dto.AnalyticsOverviewResponse;
import com.sdlc.backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/overview")
    public ResponseEntity<AnalyticsOverviewResponse> getOverview(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        Long orgId = jwtUtil.extractOrgId(token);

        return ResponseEntity.ok(analyticsService.getOverview(orgId));
    }
}