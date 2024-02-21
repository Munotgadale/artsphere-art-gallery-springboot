package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Art;
import com.cdac.entity.Art.ArtStatus;
import com.cdac.entity.Art.BiddingArtStatus;
import com.cdac.exception.ArtistServiceException;
import com.cdac.repository.ArtRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ArtBidService {
	
	@Autowired
	private ArtRepository artRepository;
	
	public int addImages(Art art) {
	        Art savedArt = artRepository.save(art);
	        savedArt.setArtStatus(ArtStatus.AVAILABLE);
	        savedArt.setBiddingArtStatus(BiddingArtStatus.BIDDING);
	        return savedArt.getId();
	}
	
	public void deleteImages(Art art) {
		artRepository.delete(art);
	}
	public Art fetchById(int id) {
		Optional<Art> art = artRepository.findById(id);
		if(art.isPresent())
			return art.get();
		else
			throw new ArtistServiceException("Art with id " + id + " does not exist!");
	}
	
	public List<Art> fetchArtPhotosByArtistId(int artistId) {
        return artRepository.findByArtist_ArtistId(artistId);
    }

	public List<Art> fetchAllArts() {
			return artRepository.findAll();
		}
}
