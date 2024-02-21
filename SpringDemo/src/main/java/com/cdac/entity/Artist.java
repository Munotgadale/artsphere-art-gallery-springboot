package com.cdac.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_new_artist_artist")
public class Artist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "new_artist_sequence")
	@SequenceGenerator(name = "new_artist_sequence",sequenceName = "sequence_for_new_artist", allocationSize = 1,initialValue = 1)
	private int artistId;
	
	@Column(length = 30)
	private String artistName;
	
	@Column(length = 30, unique = true)
	private String artistEmail;
	
	@Column(length = 10)
	private long artistPhone;
	
	@Column(nullable = false)
	private String artistPassword;
	
	private String profilePic;
	private int artworksCreated;
	private int prizesWon;
	private String exhibitionsAttended;
	@Column(length = 30)
	private String artStyle;
	
	@Enumerated(EnumType.STRING)
	private ArtistStatus artistStatus;
	
	public static enum ArtistStatus{
		ACTIVE,VERIFICATION_PENDING, INACTIVE, DELETED
	}
	
	@JsonManagedReference
	@OneToMany(mappedBy = "artist", cascade = CascadeType.ALL)
	private List<Art> artPhotos;
	
	@OneToMany(mappedBy = "artist", cascade = CascadeType.ALL)
    private List<PasswordResetTokenArtist> passwordResetTokenArtists;


	public List<Art> getArtPhotos() {
		return artPhotos;
	}

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

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
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

	public void setArtPhotos(List<Art> artPhotos) {
		this.artPhotos = artPhotos;
	}
	
}
