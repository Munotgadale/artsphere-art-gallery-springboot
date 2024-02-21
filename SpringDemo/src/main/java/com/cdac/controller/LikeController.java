package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.service.LikeService;

@RestController
@CrossOrigin
@RequestMapping("/api/likes")
public class LikeController {
	
    @Autowired
    private LikeService likeService;

    @PostMapping("/toggle/{userId}/{artId}")
    public ResponseEntity<?> toggleLike(@PathVariable Long userId, @PathVariable Long artId) {
        try {
            int likesCount = likeService.toggleLike(userId, artId);
            return ResponseEntity.ok(likesCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @GetMapping("/getLikesCount/{artId}")
    public ResponseEntity<?> getLikesCount(@PathVariable Long artId) {
        try {
            int likesCount = likeService.getLikesCount(artId);
            return ResponseEntity.ok(likesCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
