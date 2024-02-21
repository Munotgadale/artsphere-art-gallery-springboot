package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Review;
import com.cdac.repository.ReviewRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
	
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

	public boolean deleteReview(Long id) {
		Optional<Review> existingReview = findReviewById(id);
		if (existingReview.isPresent()) {
			reviewRepository.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
	
	public Review editReview(Long id, Review updatedReview) {
        Optional<Review> existingReview = findReviewById(id);

        if (existingReview.isPresent()) {
            Review reviewToUpdate = existingReview.get();
            reviewToUpdate.setUserName(updatedReview.getUserName());
            reviewToUpdate.setUserEmail(updatedReview.getUserEmail());
            reviewToUpdate.setComment(updatedReview.getComment());
            reviewToUpdate.setRating(updatedReview.getRating());

            return reviewRepository.save(reviewToUpdate);
        }
        return null;
    }

	public Optional<Review> findReviewById(Long id) {
        return reviewRepository.findById(id);
    }
}
