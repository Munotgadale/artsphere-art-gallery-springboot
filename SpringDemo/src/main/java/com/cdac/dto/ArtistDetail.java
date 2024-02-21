package com.cdac.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.Art;

public class ArtistDetail {
	
	private int artistId;
	private String artistName;
	private String artistEmail;
	private long artistPhone;
	private String artistPassword;
	
	private MultipartFile profilePic;
	
	private int artworksCreated;
	private int prizesWon;
	private String exhibitionsAttended;
	private String artStyle;
	
	private ArtistStatus artistStatus;
	
	public static enum ArtistStatus{
		ACTIVE, INACTIVE, DELETED
	}
	
	private List<Art> artPhotos;

	public int getArtistId() {
		return artistId;
	}

	public void setArtistId(int artistId) {
		this.artistId = artistId;
	}

	public String getArtistName() {
		return artistName;
	}

	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}

	public String getArtistEmail() {
		return artistEmail;
	}

	public void setArtistEmail(String artistEmail) {
		this.artistEmail = artistEmail;
	}

	public long getArtistPhone() {
		return artistPhone;
	}

	public void setArtistPhone(long artistPhone) {
		this.artistPhone = artistPhone;
	}

	public String getArtistPassword() {
		return artistPassword;
	}

	public void setArtistPassword(String artistPassword) {
		this.artistPassword = artistPassword;
	}

	public MultipartFile getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(MultipartFile profilePic) {
		this.profilePic = profilePic;
	}

	public int getArtworksCreated() {
		return artworksCreated;
	}

	public void setArtworksCreated(int artworksCreated) {
		this.artworksCreated = artworksCreated;
	}

	public int getPrizesWon() {
		return prizesWon;
	}

	public void setPrizesWon(int prizesWon) {
		this.prizesWon = prizesWon;
	}

	public String getExhibitionsAttended() {
		return exhibitionsAttended;
	}

	public void setExhibitionsAttended(String exhibitionsAttended) {
		this.exhibitionsAttended = exhibitionsAttended;
	}

	public String getArtStyle() {
		return artStyle;
	}

	public void setArtStyle(String artStyle) {
		this.artStyle = artStyle;
	}

	public ArtistStatus getArtistStatus() {
		return artistStatus;
	}

	public void setArtistStatus(ArtistStatus artistStatus) {
		this.artistStatus = artistStatus;
	}

	public List<Art> getArtPhotos() {
		return artPhotos;
	}

	public void setArtPhotos(List<Art> artPhotos) {
		this.artPhotos = artPhotos;
	}

}
