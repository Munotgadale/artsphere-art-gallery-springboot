package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Artist;
import com.cdac.entity.PasswordResetTokenArtist;

public interface PasswordResetTokenRepositoryArtist extends JpaRepository<PasswordResetTokenArtist, Long>{
	PasswordResetTokenArtist findByToken(String token);
	void deleteByArtist(Artist artist);
}
