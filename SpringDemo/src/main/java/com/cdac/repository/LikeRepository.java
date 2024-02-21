package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdac.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Like findByUserIdAndArtId(Long userId, Long artId);

    int countByArtId(Long artId);
    
    @Query("SELECT COUNT(1) FROM Like l WHERE l.artId = :artId")
    int getLikesCountByArtId(Long artId);


}