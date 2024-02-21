package com.cdac.controller;

import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Cart;
import com.cdac.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/shopping-cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getShoppingCart(@PathVariable int userId) {
        try {
            Cart cart = cartService.getCartByUserId(userId);
            if(cart == null) {
            	return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{userId}/add/{artId}")
    public ResponseEntity<RegistrationStatus> addToCart(@PathVariable int userId, @PathVariable int artId) {
        RegistrationStatus status = cartService.addToCart(userId, artId);
        if (status.isStatus()) {
            return ResponseEntity.ok(status);
        } else {
            return ResponseEntity.badRequest().body(status);
        }
    }

    @PostMapping("/{userId}/remove/{artId}")
    public ResponseEntity<RegistrationStatus> removeFromCart(@PathVariable int userId, @PathVariable int artId) {
        RegistrationStatus status = cartService.removeFromCart(userId, artId);
        if (status.isStatus()) {
            return ResponseEntity.ok(status);
        } else {
            return ResponseEntity.badRequest().body(status);
        }
    }

    @DeleteMapping("/{userId}/delete/{artId}")
    public ResponseEntity<RegistrationStatus> deleteFromCart(@PathVariable int userId, @PathVariable int artId) {
        RegistrationStatus status = cartService.deleteFromCart(userId, artId);
        if (status.isStatus()) {
            return ResponseEntity.ok(status);
        } else {
            return ResponseEntity.badRequest().body(status);
        }
    }

}
