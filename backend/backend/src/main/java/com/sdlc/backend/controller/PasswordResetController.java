package com.sdlc.backend.controller;

import com.sdlc.backend.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        Map<String, String> response = new HashMap<>();

        if (email == null || email.trim().isEmpty()) {
            response.put("message", "Email is required");
            return ResponseEntity.badRequest().body(response);
        }

        passwordResetService.createOtpForEmail(email);

        response.put("message", "If an account exists for this email, an OTP has been sent");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        Map<String, String> response = new HashMap<>();

        if (email == null || otp == null) {
            response.put("message", "Email and OTP are required");
            return ResponseEntity.badRequest().body(response);
        }

        boolean valid = passwordResetService.verifyOtp(email, otp);

        if (!valid) {
            response.put("message", "Invalid or expired OTP");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "OTP verified");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        String newPassword = body.get("newPassword");
        Map<String, String> response = new HashMap<>();

        if (email == null || otp == null) {
            response.put("message", "Email and OTP are required");
            return ResponseEntity.badRequest().body(response);
        }

        if (newPassword == null || newPassword.length() < 6) {
            response.put("message", "Password must be at least 6 characters");
            return ResponseEntity.badRequest().body(response);
        }

        boolean success = passwordResetService.resetPassword(email, otp, newPassword);

        if (!success) {
            response.put("message", "Invalid or expired OTP");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "Password reset successful");
        return ResponseEntity.ok(response);
    }
}