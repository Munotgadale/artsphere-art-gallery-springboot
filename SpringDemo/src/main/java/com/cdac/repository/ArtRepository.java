package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Art;

public interface ArtRepository extends JpaRepository<Art, Integer>{

	List<Art> findByArtist_ArtistId(int artistId);
	
}
