package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.PasswordResetToken;
import com.cdac.entity.User;
import com.cdac.service.PasswordResetTokenService;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class ForgotPasswordController {

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam(required = false) String email) {
        try {

            User user = passwordResetTokenService.findByEmail(email);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found. Please check your email address.");
            }

            PasswordResetToken token = passwordResetTokenService.createToken(user);
            passwordResetTokenService.sendPasswordResetEmail(user, token.getToken());

            return ResponseEntity.ok("User password reset email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
        }
    }
    @PostMapping("send-email")
    public ResponseEntity<String> sendEmail(@RequestParam(required = false) String email)  {
    	try {
    		User user = passwordResetTokenService.findByEmail(email);
    		if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found. Please check your email address.");
            }
    		passwordResetTokenService.sendLoginEmail(user);
    		return ResponseEntity.ok("Welcome email sent successfully");
    	} catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    	}
    }
    
    @PostMapping("send-deactive-email")
    public ResponseEntity<String> sendDeactiveEmail(@RequestParam(required = false) String email)  {
    	try {
    		User user = passwordResetTokenService.findByEmail(email);
    		if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found. Please check your email address.");
            }
    		passwordResetTokenService.sendDeactivationEmail(user);
    		return ResponseEntity.ok("Deactivate Account email sent successfully");
    	} catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    	}
    }
    
    @PostMapping("send-deletion-email")
    public ResponseEntity<String> sendDeletionEmail(@RequestParam(required = false) String email)  {
    	try {
    		if (email == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found. Please check your email address.");
            }
    		passwordResetTokenService.sendAccountDeletionEmail(email);
    		return ResponseEntity.ok("Delete Account email sent successfully");
    	} catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    	}
    }
    
    @PostMapping("send-reactive-email")
    public ResponseEntity<String> sendReactiveEmail(@RequestParam(required = false) String email)  {
    	try {
    		User user = passwordResetTokenService.findByEmail(email);
    		if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found. Please check your email address.");
            }
    		passwordResetTokenService.sendReactivationSuccessEmail(user);
    		return ResponseEntity.ok("Deactivate Account email sent successfully");
    	} catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    	}
    }

}

