package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Art;
import com.cdac.entity.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Long>{

	Auction findByArt(Art art);
	
	Auction findByArtId(Long artId);

}
