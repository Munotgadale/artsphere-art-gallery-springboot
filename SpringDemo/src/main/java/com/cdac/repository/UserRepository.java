package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	public Optional<User> findByUserEmail(String userEmail);
	Optional<User> findByUserId(int userId);
}
