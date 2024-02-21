package com.cdac.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "bidding")
public class Bidding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "art_id", nullable = false)
    @JsonIgnoreProperties("bids")
    private Art art;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("bids")
    private User user;

    @Column(name = "bid_amount", nullable = false)
    private Double bidAmount;

    @Column(name = "bid_timestamp", nullable = false)
    private LocalDateTime bidTimestamp;

    @Column(name = "bid_expiration_timestamp", nullable = false)
    private LocalDateTime bidExpirationTimestamp;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Art getArt() {
		return art;
	}

	public void setArt(Art art) {
		this.art = art;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Double getBidAmount() {
		return bidAmount;
	}

	public void setBidAmount(Double bidAmount) {
		this.bidAmount = bidAmount;
	}

	public LocalDateTime getBidTimestamp() {
		return bidTimestamp;
	}

	public void setBidTimestamp(LocalDateTime bidTimestamp) {
		this.bidTimestamp = bidTimestamp;
	}

	public LocalDateTime getBidExpirationTimestamp() {
		return bidExpirationTimestamp;
	}

	public void setBidExpirationTimestamp(LocalDateTime bidExpirationTimestamp) {
		this.bidExpirationTimestamp = bidExpirationTimestamp;
	}
    
    
    
}
