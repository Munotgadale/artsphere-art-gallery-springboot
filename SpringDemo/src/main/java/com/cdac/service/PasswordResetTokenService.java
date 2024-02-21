package com.cdac.service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cdac.entity.PasswordResetToken;
import com.cdac.entity.User;
import com.cdac.repository.PasswordResetTokenRepository;
import com.cdac.repository.UserRepository;

@Service
public class PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRepository userRepository;

    public PasswordResetToken createToken(User user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(calculateExpiryDate(60));
        return tokenRepository.save(resetToken);
    }
    public User findByEmail(String email) {
    	Optional<User> optionalUser = userRepository.findByUserEmail(email);
    	User existingUser = optionalUser.get();
    	return existingUser;
    }

    public PasswordResetToken findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public void validateToken(PasswordResetToken token) {
        if (token == null || token.getExpiryDate().before(new Date())) {
            throw new RuntimeException("Invalid or expired token");
        }
    }

    public void sendPasswordResetEmail(User user, String token) {
        String recipientAddress = user.getUserEmail();
        String subject = "Password Reset Request";
//        String resetLink = "http://your-app-url/reset-password?token=" + token;
        String originalEmail = user.getUserEmail(); 
        String originalPassword = user.getUserPassword();

        String message = "Dear " + user.getUserName() + ",\n\n"
                + "You have forgotten your password. As requested, here are your account details:\n\n"
                + "Original Email: " + originalEmail + "\n"
                + "Temporary Password: " + originalPassword + "\n\n"
                + "Please log in using this password and change it immediately after logging in to ensure the security of your account.\n\n"
                + "If you didn't request this, please ignore this email. Your password will remain unchanged.";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message);
        javaMailSender.send(email);
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }
    
	public void sendLoginEmail(User user) {
		String recipientAddress = user.getUserEmail();
		String subject = "Welcome to ArtSphere Art Gallery!";

		String message = "Dear " + user.getUserName() + ",\n\n"
		        + "Welcome to ArtSphere Art Gallery! We are thrilled to have you as part of our creative community.\n\n"
		        + "Thank you for joining us on this artistic journey. Explore our galleries, discover new artworks. If you have any questions or need assistance, feel free to reach out.\n\n"
		        + "Get ready to immerse yourself in the world of art!\n\n"
		        + "Best regards,\nArtSphere Team";

		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo(recipientAddress);
		email.setSubject(subject);
		email.setText(message);
		javaMailSender.send(email);
	}
	
	public void sendDeactivationEmail(User user) {
	    String recipientAddress = user.getUserEmail();
	    String subject = "Account Deactivation Notice";

	    String message = "Dear " + user.getUserName() + ",\n\n"
	            + "We wanted to inform you that your account at ArtSphere Art Gallery has been deactivated.\n\n"
	            + "If you have any questions or concerns about this deactivation, please feel free to contact our support team.\n\n"
	            + "Thank you for being a part of our community. If you decide to return, we'll be here to welcome you back!\n\n"
	            + "Best regards,\nArtSphere Team";

	    SimpleMailMessage email = new SimpleMailMessage();
	    email.setTo(recipientAddress);
	    email.setSubject(subject);
	    email.setText(message);
	    javaMailSender.send(email);
	}
	
	public void sendReactivationSuccessEmail(User user) {
	    String recipientAddress = user.getUserEmail();
	    String subject = "Account Reactivation Successful";

	    String message = "Dear " + user.getUserName() + ",\n\n"
	            + "We are pleased to inform you that your account at ArtSphere Art Gallery has been successfully reactivated.\n\n"
	            + "Welcome back! If you have any questions or need assistance, please feel free to contact our support team.\n\n"
	            + "Thank you for choosing ArtSphere. We're thrilled to have you back as a valued member of our community!\n\n"
	            + "Best regards,\nArtSphere Team";

	    SimpleMailMessage email = new SimpleMailMessage();
	    email.setTo(recipientAddress);
	    email.setSubject(subject);
	    email.setText(message);
	    javaMailSender.send(email);
	}

	
	public void sendAccountDeletionEmail(String newEmail) {
	    String recipientAddress = newEmail;
	    String subject = "Account Deletion Confirmation";

	    String message = "Dear " + newEmail + ",\n\n"
	            + "We're sorry to see you go, but we confirm that your account at ArtSphere Art Gallery has been deleted.\n\n"
	            + "If you didn't request this deletion, please contact our support team immediately.\n\n"
	            + "Thank you for being a part of our community. If you ever decide to return, we'll be here to welcome you back!\n\n"
	            + "Best regards,\nArtSphere Team";

	    SimpleMailMessage email = new SimpleMailMessage();
	    email.setTo(recipientAddress);
	    email.setSubject(subject);
	    email.setText(message);
	    javaMailSender.send(email);
	}

}
