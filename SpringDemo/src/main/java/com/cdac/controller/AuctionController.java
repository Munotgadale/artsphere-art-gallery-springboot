package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.entity.Auction;
import com.cdac.service.AuctionService;

@RestController
@CrossOrigin
@RequestMapping("/api/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @GetMapping("/get-all-auctions")
    public ResponseEntity<List<Auction>> getAllAuctions() {
        List<Auction> auctions = auctionService.getAllAuctions();
        return ResponseEntity.ok(auctions);
    }
    
    @GetMapping("/get-auction-by-art/{artId}")
    public ResponseEntity<Auction> getAuctionByArtId(@PathVariable Long artId) {
        Auction auction = auctionService.getAuctionByArtId(artId);
        if (auction != null) {
            return ResponseEntity.ok(auction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/get-auction/{auctionId}")
    public ResponseEntity<Auction> getAuctionById(@PathVariable Long auctionId) {
        Auction auction = auctionService.getAuctionById(auctionId);
        if (auction != null) {
            return ResponseEntity.ok(auction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create-auction")
    public ResponseEntity<String> createAuction(@RequestBody Auction auction) {
        try {
            Auction createdAuction = auctionService.createAuction(auction);
            return ResponseEntity.ok().body("Successfully Created");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/delete-auction/{auctionId}")
    public ResponseEntity<Void> deleteAuction(@PathVariable Long auctionId) {
        auctionService.deleteAuction(auctionId);
        return ResponseEntity.noContent().build();
    }
}
