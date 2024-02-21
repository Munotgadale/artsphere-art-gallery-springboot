package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Artist;
import com.cdac.entity.Artist.ArtistStatus;
import com.cdac.exception.ArtistServiceException;
import com.cdac.exception.UserServiceException;
import com.cdac.repository.ArtistRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ArtistService {
	
	@Autowired
	private ArtistRepository artistRepository;
	
	public int register(Artist artist) {
	    Optional<Artist> isArtistAlreadyPresent = artistRepository.findByArtistEmail(artist.getArtistEmail());
	    if (isArtistAlreadyPresent.isEmpty()) {
	    	String hashedPassword = BCrypt.hashpw(artist.getArtistPassword(), BCrypt.gensalt());
	    	artist.setArtistPassword(hashedPassword);
	        Artist savedArtist = artistRepository.save(artist);
	        savedArtist.setArtistStatus(ArtistStatus.ACTIVE);
	        return savedArtist.getArtistId();
	    } else {
	        throw new ArtistServiceException("Oops! Looks like you've already claimed your spot in our exclusive club.");
	    }
	}

	public Artist login(Artist artist) {
	    Optional<Artist> isArtistPresent = artistRepository.findByArtistEmail(artist.getArtistEmail());
	    if (isArtistPresent.isPresent()) {
	        Artist existingUser = isArtistPresent.get();
	        if (artist.getArtistPassword().equals(existingUser.getArtistPassword()) || BCrypt.checkpw(artist.getArtistPassword(), existingUser.getArtistPassword())) {
	        	if(existingUser.getArtistStatus() == ArtistStatus.ACTIVE) {
		            return existingUser;
	        	}
	        	else {
	        		throw new UserServiceException("Your Account Status is Deactivated, To Activate Connect to the Admin");
	        	}
	        } else {
	            throw new ArtistServiceException("Uh-oh! The secret password didn't quite match. Please try again.");
	        }
	    } else {
	        throw new ArtistServiceException("Oops! We couldn't find anyone with that email. Double-check or join our community!");
	    }
	}

	public int update(Artist artist) {
	    Optional<Artist> optionalArtist = artistRepository.findById(artist.getArtistId());

	    if (optionalArtist.isPresent()) {
	        
	        Artist existingArtist = optionalArtist.get();
	        existingArtist.setArtistName(artist.getArtistName());
	        existingArtist.setArtistEmail(artist.getArtistEmail());
	        existingArtist.setArtistPhone(artist.getArtistPhone());
	        String hashedPassword = BCrypt.hashpw(artist.getArtistPassword(), BCrypt.gensalt());
	        existingArtist.setArtistPassword(hashedPassword);
	        existingArtist.setProfilePic(artist.getProfilePic());
	        
	        Artist updatedArtist = artistRepository.save(existingArtist);
	        
	        updatedArtist.setArtistStatus(ArtistStatus.ACTIVE);
	        return updatedArtist.getArtistId();
	    } else {
	        throw new ArtistServiceException("Artist not found with ID: " + artist.getArtistId());
	    }
	}
	
	public void delete(Artist artist) {
	     artistRepository.save(artist);
	}
	
	public void reActive(Artist artist) {
	     artistRepository.save(artist);
	}
	
	public void permanentlyDelete(Artist artist) {
	     artistRepository.delete(artist);
	}

	public Artist fetchById(int id) {
		Optional<Artist> artist = artistRepository.findById(id);
		if(artist.isPresent())
			return artist.get();
		else
			throw new ArtistServiceException("Artist with id " + id + " does not exist!");
	}

	public List<Artist> getAllArtists() {
		return artistRepository.findAll();
	}
}