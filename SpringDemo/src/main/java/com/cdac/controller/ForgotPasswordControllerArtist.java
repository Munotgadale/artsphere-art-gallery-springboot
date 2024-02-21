package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.Artist;
import com.cdac.entity.PasswordResetTokenArtist;
import com.cdac.service.PasswordResetTokenServiceArtist;

@RestController
@CrossOrigin
@RequestMapping("/artist")
public class ForgotPasswordControllerArtist {

	@Autowired
	private PasswordResetTokenServiceArtist passwordResetTokenServiceArtist;
	
	@PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam(required = false) String email) {
        try {

            Artist artist = passwordResetTokenServiceArtist.findByEmail(email);

            if (artist == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found. Please check your email address.");
            }

            PasswordResetTokenArtist token = passwordResetTokenServiceArtist.createToken(artist);
            passwordResetTokenServiceArtist.sendPasswordResetEmail(artist, token.getToken());

            return ResponseEntity.ok("Artist password reset email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
        }
    }
    @PostMapping("send-email")
    public ResponseEntity<String> sendEmail(@RequestParam(required = false) String email)  {
    	try {
    		Artist artist = passwordResetTokenServiceArtist.findByEmail(email);
    		if (artist == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found. Please check your email address.");
            }
    		passwordResetTokenServiceArtist.sendLoginEmail(artist);
    		return ResponseEntity.ok("Welcome email sent successfully");
    	} catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    	}
    }
    
    @PostMapping("send-deactive-email")
    public ResponseEntity<String> sendDeactiveEmail(@RequestParam(required = false) String email)  {
    	try {
    		Artist artist = passwordResetTokenServiceArtist.findByEmail(email);
    		if (artist == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found. Please check your email address.");
            }
    		passwordResetTokenServiceArtist.sendDeactivationEmail(artist);
    		return ResponseEntity.ok("Deactivate Account email sent successfully");
    	} catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    	}
    }
    
    @PostMapping("send-deletion-email")
    public ResponseEntity<String> sendDeletionEmail(@RequestParam(required = false) String email)  {
    	try {
    		if (email == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found. Please check your email address.");
            }
    		passwordResetTokenServiceArtist.sendAccountDeletionEmail(email);
    		return ResponseEntity.ok("Delete Account email sent successfully");
    	} catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    	}
    }
    
    @PostMapping("send-reactive-email")
    public ResponseEntity<String> sendReactiveEmail(@RequestParam(required = false) String email)  {
    	try {
    		Artist artist = passwordResetTokenServiceArtist.findByEmail(email);
    		if (artist == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found. Please check your email address.");
            }
    		passwordResetTokenServiceArtist.sendReactivationSuccessEmail(artist);
    		return ResponseEntity.ok("Deactivate Account email sent successfully");
    	} catch(Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again.");
    	}
    }

}
