package com.cdac.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Auction;
import com.cdac.repository.AuctionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuctionService {
	
	@Autowired
	private AuctionRepository auctionRepository;
	
	public List<Auction> getAllAuctions() {
	    return auctionRepository.findAll();
	}
	
	public Auction getAuctionByArtId(Long artId) {
        return auctionRepository.findByArtId(artId);
    }
	
	public Auction getAuctionById(Long auctionId) {
	    return auctionRepository.findById(auctionId).orElse(null);
	}
	
	public Auction createAuction(Auction auction) {
	    return auctionRepository.save(auction);
	}
	
	public void deleteAuction(Long auctionId) {
	    auctionRepository.deleteById(auctionId);
	}
}