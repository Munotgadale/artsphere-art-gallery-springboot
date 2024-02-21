package com.cdac.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_new_user_user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "new_user_sequence")
	@SequenceGenerator(name = "new_user_sequence",sequenceName = "sequence_for_new_user", allocationSize = 1,initialValue = 1)
	private int userId;
	
	@Column(length = 30)
	private String userName;
	
	@Column(length = 30, unique = true)
	private String userEmail;
	
	@Column(length = 10)
	private long userPhone;
	
	@Column(nullable = false)
	private String userPassword;
	
	private String profilePic;
	
	@Enumerated(EnumType.STRING)
	private UserStatus userStatus;
	
	public static enum UserStatus{
		ACTIVE, INACTIVE, DELETED
	}

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("user")
	private List<PasswordResetToken> passwordResetTokens;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("user")
	private List<Bidding> bids;
	 
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Cart cart;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Address> addresses;

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public List<Bidding> getBids() {
		return bids;
	}

	public void setBids(List<Bidding> bids) {
		this.bids = bids;
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

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public UserStatus getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(UserStatus userStatus) {
		this.userStatus = userStatus;
	}
	
}
