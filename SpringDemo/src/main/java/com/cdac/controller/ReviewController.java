package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.Review;
import com.cdac.service.ReviewService;

@RestController
@CrossOrigin
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/get-all-reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/add-review")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        Review savedReview = reviewService.addReview(review);
        return ResponseEntity.ok(savedReview);
    }

    @DeleteMapping("delete-review/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        try {
            boolean bool = reviewService.deleteReview(id);
            if(bool) {
                return ResponseEntity.ok("Review with ID " + id + " deleted successfully");
            }
            else {
            	return ResponseEntity.notFound().build();
            }
       
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("update-review/{id}")
    public ResponseEntity<Review> editReview(@PathVariable Long id, @RequestBody Review updatedReview) {
        try {
            Review editedReview = reviewService.editReview(id, updatedReview);
            return ResponseEntity.ok(editedReview);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
