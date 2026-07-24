package com.sdlc.backend.service;

import com.sdlc.backend.model.PasswordResetToken;
import com.sdlc.backend.model.User;
import com.sdlc.backend.repository.PasswordResetTokenRepository;
import com.sdlc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final int EXPIRY_MINUTES = 10;
    private static final SecureRandom RANDOM = new SecureRandom();

    @Transactional
    public void createOtpForEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        // Always behave the same whether or not the email exists —
        // avoids leaking which emails are registered
        if (userOpt.isEmpty()) {
            return;
        }

        // Remove any existing OTP for this email before creating a new one
        tokenRepository.deleteByEmail(email);

        String otp = generateOtp();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(EXPIRY_MINUTES);

        PasswordResetToken resetToken = new PasswordResetToken(otp, email, expiry);
        tokenRepository.save(resetToken);

        // TODO: replace with real email sending
        System.out.println("Password reset OTP for " + email + ": " + otp);
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByEmailAndOtp(email, otp);

        if (tokenOpt.isEmpty()) {
            return false;
        }

        PasswordResetToken resetToken = tokenOpt.get();
        return !resetToken.isUsed() && !resetToken.isExpired();
    }

    @Transactional
    public boolean resetPassword(String email, String otp, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByEmailAndOtp(email, otp);

        if (tokenOpt.isEmpty()) {
            return false;
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (resetToken.isUsed() || resetToken.isExpired()) {
            return false;
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setUsed(true);
        tokenRepository.save(resetToken);

        return true;
    }

    private String generateOtp() {
        int otp = 100000 + RANDOM.nextInt(900000); // always 6 digits
        return String.valueOf(otp);
    }
}