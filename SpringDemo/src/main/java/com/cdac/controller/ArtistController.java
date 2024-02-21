package com.cdac.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.dto.ArtistDetail;
import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Artist;
import com.cdac.entity.Artist.ArtistStatus;
import com.cdac.exception.ArtistServiceException;
import com.cdac.service.ArtistService;

@RestController
@CrossOrigin
public class ArtistController {
	
	@Autowired
	private ArtistService artistService;
	
	@PostMapping("/register-artist")
	public ResponseEntity<RegistrationStatus> registerv3(ArtistDetail artistDetails) {
	    try {
	        Artist artist = new Artist();
	        BeanUtils.copyProperties(artistDetails, artist);

	        MultipartFile profilePic = artistDetails.getProfilePic();
	        if (profilePic != null) {
	            try {
	                String fileName = profilePic.getOriginalFilename();

	                String generatedFileName = fileName; 

	                artist.setProfilePic(generatedFileName);

	                InputStream is = profilePic.getInputStream();
	                FileOutputStream os = new FileOutputStream("D:" + File.separator + "Art_Gallary" + File.separator + "Mini_project" + File.separator + "Profiles" + File.separator + generatedFileName);
	                FileCopyUtils.copy(is, os);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        } else {
	            RegistrationStatus status = new RegistrationStatus();
	            status.setStatus(false);
	            status.setStatusMessage("Profile picture is required.");
	            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	        }

	        int id = artistService.register(artist);
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(true);
	        status.setStatusMessage("Registration successful!");
	        status.setId(id);

	        return new ResponseEntity<>(status, HttpStatus.OK);

	    } catch (ArtistServiceException e) {
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage(e.getMessage());

	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	    }
	}

	
	@PostMapping("/login-artist")
	public RegistrationStatus isArtistPresent(@RequestBody Artist artist){
		try {
			Artist newArtist = artistService.login(artist);
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(true);
			status.setStatusMessage("Login Successfull");
			status.setEmail(newArtist.getArtistEmail());
			status.setName(newArtist.getArtistName());
			status.setId(newArtist.getArtistId());
			return status;
		} catch (Exception e) {
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(false);
			status.setStatusMessage(e.getMessage());
			return status;
		}
	}
	
	@PostMapping("/artist-update")
	public ResponseEntity<RegistrationStatus> update(ArtistDetail artistDetails) {
		try {
			Artist artist = new Artist();
			BeanUtils.copyProperties(artistDetails, artist);

			try {
				String fileName = artistDetails.getProfilePic().getOriginalFilename();
				String generatedFileName = fileName; 
				
				artist.setProfilePic(generatedFileName);
				
				InputStream is = artistDetails.getProfilePic().getInputStream();
				FileOutputStream os = new FileOutputStream("D:" + File.separator + "Art_Gallary" + File.separator + "Mini_project" + File.separator + "Profiles" + File.separator + generatedFileName);
				FileCopyUtils.copy(is, os);
			}
			catch (IOException e) {
				
			}
			
			int id = artistService.update(artist);
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(true);
			status.setStatusMessage("Artist Updated Successful!");
			status.setId(id);
			
			return new ResponseEntity<RegistrationStatus>(status, HttpStatus.OK);
				
		}
		catch(ArtistServiceException e) {
			RegistrationStatus status = new RegistrationStatus();
			status.setStatus(false);
			status.setStatusMessage(e.getMessage());
			
			return new ResponseEntity<RegistrationStatus>(status, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/delete-artist/{id}")
	public ResponseEntity<?> deleteArtist(@PathVariable int id) {
	    try {
	        Artist fetchedArtist = artistService.fetchById(id);
	        if (fetchedArtist != null) {
	        	fetchedArtist.setArtistStatus(ArtistStatus.DELETED);
	            artistService.delete(fetchedArtist);
	            return ResponseEntity.ok("Artist with ID: " + fetchedArtist.getArtistId() + " deleted successfully");
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (ArtistServiceException e) {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("not found");
	    }
	}
	
	@PostMapping("/reactive-artist/{id}")
	public ResponseEntity<?> reactiveArtist(@PathVariable int id){
		try {
			Artist fetchedArtist = artistService.fetchById(id);
			if (fetchedArtist != null) {
	        	fetchedArtist.setArtistStatus(ArtistStatus.ACTIVE);
	            artistService.reActive(fetchedArtist);
	            return ResponseEntity.ok("Artist with ID: " + fetchedArtist.getArtistId() + " Reactivated Successfully");
	        } else {
	            return ResponseEntity.notFound().build();
	        }
		} catch (ArtistServiceException e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("not found");
		}
	}
	
	@DeleteMapping("/permanently-delete/{id}")
	public ResponseEntity<?> PermanentlyDeleteArtist(@PathVariable int id) {
	    try {
	        Artist fetchedArtist = artistService.fetchById(id);
	        if (fetchedArtist != null) {
	            artistService.permanentlyDelete(fetchedArtist);
	            return ResponseEntity.ok("Artist with ID: " + fetchedArtist.getArtistId() + "Permanently deleted successfully");
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (ArtistServiceException e) {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("not found");
	    }
	}
	@GetMapping("/all-artists")
	public ResponseEntity<RegistrationStatus> getAllArtists() {
	    try {
	        List<Artist> artists = artistService.getAllArtists();

	        RegistrationStatus status = new RegistrationStatus();
	        status.setList(artists);
	        status.setStatus(true);
	        status.setStatusMessage("All artists fetched successfully.");

	        return new ResponseEntity<>(status, HttpStatus.OK);
	    } catch (ArtistServiceException e) {
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage("Failed to fetch all artists: " + e.getMessage());

	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	    }
	}
	

	@GetMapping("/artist/fetch/{id}")
	public Artist fetchById(@PathVariable int id) {
		return artistService.fetchById(id);
	}
	
	@GetMapping(path = "/artist/fetch/profilePic/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getProfilePic(@PathVariable int id) throws IOException {
		Artist artist = artistService.fetchById(id);
	    return Files.readAllBytes(Paths.get("D:" + File.separator + "Art_Gallary" + File.separator + "Mini_project" + File.separator + "Profiles" + File.separator + artist.getProfilePic()));
	}

}
