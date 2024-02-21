package com.cdac.dto;

import java.util.Date;

public class ExhibitionDetail {
	 
		private int id;	
	    private String title;
	    private Date date;
	    private String venue;
	    private String description;
	    private String image;

	    public int getId() {
	        return id;
	    }

	    public void setId(int id) {
	        this.id = id;
	    }

	    public String getTitle() {
	        return title;
	    }

	    public void setTitle(String title) {
	        this.title = title;
	    }

	    public Date getDate() {
	        return date;
	    }

	    public void setDate(Date date) {
	        this.date = date;
	    }

	    public String getVenue() {
	        return venue;
	    }

	    public void setVenue(String venue) {
	        this.venue = venue;
	    }

	    public String getDescription() {
	        return description;
	    }

	    public void setDescription(String description) {
	        this.description = description;
	    }

	    public String getImage() {
	        return image;
	    }

	    public void setImage(String image) {
	        this.image = image;
	    }
}
