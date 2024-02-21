package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Artist;

public interface ArtistRepository extends JpaRepository<Artist, Integer>{
	public Optional<Artist> findByArtistEmail(String artistEmail);
}
