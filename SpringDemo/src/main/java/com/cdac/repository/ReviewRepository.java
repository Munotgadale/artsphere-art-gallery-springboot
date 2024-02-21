package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{

}
