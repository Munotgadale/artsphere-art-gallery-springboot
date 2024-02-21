package com.cdac.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Art;
import com.cdac.entity.Bidding;
import com.cdac.entity.User;
import com.cdac.repository.BiddingRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BiddingService {

    @Autowired
    private BiddingRepository biddingRepository;

    @Autowired
    private ArtBidService artBidService;
    
    @Autowired
    private UserService userService;

    public List<Bidding> getBidsForArt(Long artId) {
        return biddingRepository.findByArtId(artId);
    }
    
    public Bidding placeBid(Bidding newBid) {
        // Check if the newBid is not null and the bid expiration time is in the future
        if (newBid != null && LocalDateTime.now().isBefore(newBid.getBidExpirationTimestamp())) {
            Art art = artBidService.fetchById(newBid.getArt().getId());
            User user = userService.fetchById(newBid.getUser().getUserId());

            // Check if the associated art and user exist
            if (art != null && user != null) {
                // Check if there is an existing bid from the same user on the same art
                Bidding existingBid = biddingRepository.findByArtIdAndUserUserId(art.getId(), user.getUserId());

                // Check if the new bid amount is greater than the current bid
                if (existingBid != null) {
                    if (newBid.getBidAmount() > art.getCurrentBid()) {
                        // Delete the existing bid
                        biddingRepository.delete(existingBid);

                        // Create a new bid
                        newBid.setBidTimestamp(LocalDateTime.now());
                        art.setCurrentBid(newBid.getBidAmount());
                        return biddingRepository.save(newBid);
                    }
                } else {
                    if (newBid.getBidAmount() > art.getCurrentBid()) {
                        // Create a new bid
                        newBid.setBidTimestamp(LocalDateTime.now());
                        art.setCurrentBid(newBid.getBidAmount());
                        return biddingRepository.save(newBid);
                    }
                }
            }
        }
        return null; // Return null if any condition fails
    }




}
