package com.cdac.dto;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.entity.Artist;

public class ArtDetail {
	    private int id;

	    private MultipartFile photoUrl;

	    private Artist artist;
	    
	    private String title;
	    private String artistName;
	    private String size;
	    private String medium;
	    private Long price;
	    
	    private Long currentBid;
		
		private ArtStatus artStatus;
	    
		public static enum ArtStatus{
			AVAILABLE, SOLD
		}

		private BiddingArtStatus biddingArtStatus;
	    
		public static enum BiddingArtStatus{
			BIDDING,NOTBIDDING
		}
	    
	    public Long getCurrentBid() {
			return currentBid;
		}

		public void setCurrentBid(Long currentBid) {
			this.currentBid = currentBid;
		}

		public ArtStatus getArtStatus() {
			return artStatus;
		}

		public void setArtStatus(ArtStatus artStatus) {
			this.artStatus = artStatus;
		}

		public BiddingArtStatus getBiddingArtStatus() {
			return biddingArtStatus;
		}

		public void setBiddingArtStatus(BiddingArtStatus biddingArtStatus) {
			this.biddingArtStatus = biddingArtStatus;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getArtistName() {
			return artistName;
		}

		public void setArtistName(String artistName) {
			this.artistName = artistName;
		}

		public String getSize() {
			return size;
		}

		public void setSize(String size) {
			this.size = size;
		}

		public String getMedium() {
			return medium;
		}

		public void setMedium(String medium) {
			this.medium = medium;
		}

		public Long getPrice() {
			return price;
		}

		public void setPrice(Long price) {
			this.price = price;
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public MultipartFile getPhotoUrl() {
			return photoUrl;
		}

		public void setPhotoUrl(MultipartFile photoUrl) {
			this.photoUrl = photoUrl;
		}

		public Artist getArtist() {
			return artist;
		}

		public void setArtist(Artist artist) {
			this.artist = artist;
		}
	    
	    
}
