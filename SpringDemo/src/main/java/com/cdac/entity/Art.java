package com.cdac.entity;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "art_photos")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Art {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private int id;

    @Column(name = "photo_url")
    private String photoUrl;
    
    private String title;
    private String artistName;
    private String size;
    private String medium;
    private Long price;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "artistId")
    private Artist artist;

    @OneToMany(mappedBy = "art", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("art")
    private List<Bidding> bids;
    
    @ManyToMany(mappedBy = "arts")
    private Set<Cart> carts;
    
    @OneToMany(mappedBy = "art", cascade = CascadeType.ALL)
	private List<Address> addresses;
    
    public Set<Cart> getCarts() {
		return carts;
	}

	public void setCarts(Set<Cart> carts) {
		this.carts = carts;
	}

	public List<Bidding> getBids() {
		return bids;
	}

	public void setBids(List<Bidding> bids) {
		this.bids = bids;
	}

	private Double currentBid;
	
    @Enumerated(EnumType.STRING)
	private ArtStatus artStatus;
    
	public static enum ArtStatus{
		AVAILABLE, SOLD
	}

    @Enumerated(EnumType.STRING)
	private BiddingArtStatus biddingArtStatus;
    
	public static enum BiddingArtStatus{
		BIDDING,NOTBIDDING
	}
    
    public Double getCurrentBid() {
		return currentBid;
	}

	public void setCurrentBid(Double bidAmount) {
		this.currentBid = bidAmount;
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

	public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

}
