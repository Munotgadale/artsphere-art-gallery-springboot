package com.cdac.dto;

import java.util.List;

public class RegistrationStatus {

	private boolean status;
	private String statusMessage;
	private int id;
	private String email;
	private String name;
	private String password;
	
	private List<?> list;
    
    public List<?> getList() {
        return list;
    }

    public void setList(List<?> artList) {
        this.list = artList;
    }
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getStatusMessage() {
		return statusMessage;
	}
	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	
}