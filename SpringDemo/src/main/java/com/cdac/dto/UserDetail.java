package com.cdac.dto;

import org.springframework.web.multipart.MultipartFile;

public class UserDetail {
	private int userId;
	private String userName;
	private String userEmail;
	private long userPhone;
	private String userPassword;
	private MultipartFile profilePic;
	
	private UserStatus userStatus;
	
	public static enum UserStatus{
		ACTIVE, INACTIVE, DELETED
	}
	

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public long getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(long userPhone) {
		this.userPhone = userPhone;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public MultipartFile getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(MultipartFile profilePic) {
		this.profilePic = profilePic;
	}

	public UserStatus getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(UserStatus userStatus) {
		this.userStatus = userStatus;
	}
	
}
