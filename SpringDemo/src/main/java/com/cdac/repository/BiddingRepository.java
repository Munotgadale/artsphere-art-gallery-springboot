package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Bidding;

public interface BiddingRepository extends JpaRepository<Bidding, Long> {
    List<Bidding> findByArtId(Long artId);
    Bidding findByArtIdAndUserUserId(int artId, int userId);
}
