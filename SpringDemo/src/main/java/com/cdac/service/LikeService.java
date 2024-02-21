package com.cdac.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Like;
import com.cdac.repository.LikeRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LikeService {
	
    @Autowired
    private LikeRepository likeRepository;

    public int toggleLike(Long userId, Long artId) {
        Like existingLike = likeRepository.findByUserIdAndArtId(userId, artId);
        if (existingLike == null) {
            likeRepository.save(new Like(userId, artId));
        } else {
            likeRepository.delete(existingLike);
        }
        return likeRepository.countByArtId(artId);
    }

	public int getLikesCount(Long artId) {
		 return likeRepository.getLikesCountByArtId(artId);
	}

}
