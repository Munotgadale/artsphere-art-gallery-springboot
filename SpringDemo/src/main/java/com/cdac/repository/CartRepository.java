package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer>{

	Cart findByUserUserId(int userId);

}
