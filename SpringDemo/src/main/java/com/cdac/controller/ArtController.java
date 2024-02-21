package com.cdac.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.dto.ArtDetail;
import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Art;
import com.cdac.exception.ArtistServiceException;
import com.cdac.service.ArtService;

@RestController
@CrossOrigin
public class ArtController {
	
	@Autowired
	private ArtService artService;
	
	@PostMapping("/add-art")
	public ResponseEntity<RegistrationStatus> registerv3(ArtDetail artDetail) {
	    try {
	        Art art = new Art();
	        BeanUtils.copyProperties(artDetail, art);

	        MultipartFile pic = artDetail.getPhotoUrl();

	        if (pic != null) {
	            try {
	                String fileName = pic.getOriginalFilename();

	                String generatedFileName = fileName; 

	                art.setPhotoUrl(generatedFileName);

	                InputStream is = pic.getInputStream();
	                FileOutputStream os = new FileOutputStream("D:" + File.separator + "Art_Gallary" + File.separator + "Mini_project" + File.separator + "Profiles" + File.separator + generatedFileName);
	                FileCopyUtils.copy(is, os);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        } else {
	            RegistrationStatus status = new RegistrationStatus();
	            status.setStatus(false);
	            status.setStatusMessage("picture is required.");
	            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	        }

	        int id = artService.addImages(art);
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(true);
	        status.setStatusMessage("Photo Uploaded Successful!");
	        status.setId(id);

	        return new ResponseEntity<>(status, HttpStatus.OK);

	    } catch (ArtistServiceException e) {
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage(e.getMessage());

	        return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
	    }
	}
	
	@GetMapping("/artist/art/{id}")
	public Art fetchById(@PathVariable int id) {
	    Art art = artService.fetchById(id);
	    if (art == null) {
	        throw new ArtistServiceException("Art with id " + id + " does not exist!");
	    }
	    return art;
	}

	@GetMapping(path = "/artist/fetch/pic/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getProfilePic(@PathVariable int id) {
	    try {
	        Art art = artService.fetchById(id);
	        if (art == null) {
	            throw new ArtistServiceException("Art with id " + id + " does not exist!");
	        }

	        Path imagePath = Paths.get("D:", "Art_Gallary", "Mini_project", "Profiles", art.getPhotoUrl());
	        byte[] imageBytes = Files.readAllBytes(imagePath);

	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.IMAGE_JPEG);

	        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
	    } catch (IOException e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@GetMapping("/art/fetchArtPhotosByArtist/{artistId}")
	public RegistrationStatus fetchArtPhotosByArtistId(@PathVariable int artistId) {
	    try {

	        List<Art> artList = artService.fetchArtPhotosByArtistId(artistId);

	        RegistrationStatus status = new RegistrationStatus();
	        status.setList(artList);
	        status.setStatus(true);
	        status.setStatusMessage("Art photos fetched successfully.");
	        return status;
	    } catch (Exception e) {
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage("Failed to fetch art photos: " + e.getMessage());
	        return status;
	    }
	}
	
	@GetMapping("/art/fetchAllArts")
	public RegistrationStatus fetchAllArts() {
	    try {
	        List<Art> artList = artService.fetchAllArts();

	        RegistrationStatus status = new RegistrationStatus();
	        status.setList(artList);
	        status.setStatus(true);
	        status.setStatusMessage("All arts fetched successfully.");
	        return status;
	    } catch (Exception e) {
	        RegistrationStatus status = new RegistrationStatus();
	        status.setStatus(false);
	        status.setStatusMessage("Failed to fetch all arts: " + e.getMessage());
	        return status;
	    }
	}
	
	@DeleteMapping("/art/delete/{id}")
    public ResponseEntity<RegistrationStatus> deleteArt(@PathVariable int id) {
        try {
            Art art = artService.fetchById(id);
            if (art == null) {
                throw new ArtistServiceException("Art with id " + id + " does not exist!");
            }

            Path imagePath = Paths.get("D:", "Art_Gallary", "Mini_project", "Profiles", art.getPhotoUrl());
            Files.deleteIfExists(imagePath);

            artService.deleteImages(art);

            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(true);
            status.setStatusMessage("Art deleted successfully.");
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage("Failed to delete art: " + e.getMessage());
            return ResponseEntity.badRequest().body(status);
        }
    }


}
