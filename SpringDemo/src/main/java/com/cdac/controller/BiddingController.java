package com.cdac.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.Bidding;
import com.cdac.service.BiddingService;

@RestController
@CrossOrigin
@RequestMapping("/api/bidding")
public class BiddingController {

    @Autowired
    private BiddingService biddingService;

    @GetMapping("/art/{artId}")
    public ResponseEntity<List<Bidding>> getBidsForArt(@PathVariable Long artId) {
        List<Bidding> bids = biddingService.getBidsForArt(artId);
        return ResponseEntity.ok(bids);
    }


    @PostMapping("/place-bid")
    public ResponseEntity<String> placeBid(@RequestBody Bidding newBid) {
        // Check for null values and required fields
        if (newBid == null || newBid.getArt() == null || newBid.getUser() == null || newBid.getBidExpirationTimestamp() == null) {
            return ResponseEntity.badRequest().body("Invalid bid request. Check if all required fields are present.");
        }

        // Check if bid is still valid based on bid expiration time
        if (LocalDateTime.now().isBefore(newBid.getBidExpirationTimestamp())) {
            Bidding placedBid = biddingService.placeBid(newBid);

            if (placedBid != null) {
                return ResponseEntity.ok("Bid placed successfully!");
            } else {
                return ResponseEntity.badRequest().body("Unable to place bid. Check if the bid is valid.");
            }
        } else {
            return ResponseEntity.badRequest().body("Bid has expired. Unable to place bid.");
        }
    }


}
