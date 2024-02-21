package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.PasswordResetToken;
import com.cdac.entity.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    void deleteByUser(User user);
}
