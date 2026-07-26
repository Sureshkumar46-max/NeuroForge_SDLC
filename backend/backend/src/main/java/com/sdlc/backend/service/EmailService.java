package com.sdlc.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendInviteEmail(String to, String token) {
        System.out.println("===== EMAIL SERVICE CALLED =====");
        System.out.println("Sending mail to: " + to);

        String inviteLink = "http://localhost:5173/accept-invite?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("SDLC Project Invitation");
        message.setText(
                "Hello,\n\n" +
                        "You have been invited to join the SDLC Project.\n\n" +
                        "Click the link below to accept the invitation:\n\n" +
                        inviteLink +
                        "\n\nThanks,\nSDLC Team");

        mailSender.send(message);
    }
}