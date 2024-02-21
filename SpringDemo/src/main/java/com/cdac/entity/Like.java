package com.cdac.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_like")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    
    private Long artId;
    
    public Like() {
    	
    }
    
    public Like(Long userId, Long artId) {
        this.userId = userId;
        this.artId = artId;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getArtId() {
		return artId;
	}

	public void setArtId(Long artId) {
		this.artId = artId;
	}

   
}
