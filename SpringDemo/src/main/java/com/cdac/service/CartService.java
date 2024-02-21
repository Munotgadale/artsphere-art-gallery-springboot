package com.cdac.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Art;
import com.cdac.entity.Cart;
import com.cdac.entity.User;
import com.cdac.repository.CartRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ArtService artService;

    // Get cart by user id
    public Cart getCartByUserId(int userId) {
        return cartRepository.findByUserUserId(userId);
    }

    // Add art to the cart
    public RegistrationStatus addToCart(int userId, int artId) {
        try {
            User user = userService.findUserById(userId);
            if (user == null) {
                return createStatus(false, "User not found");
            }
            Art art = artService.fetchById(artId);
            if (art == null) {
                return createStatus(false, "Art not found");
            }
            Cart cart = getOrCreateCart(user);

            cart.addArt(art);
            cart.setDate(LocalDate.now()); 
            cart.setStatus(Cart.Status.PAYMENT_PENDING);
            cart.setTotalAmount(art.getPrice());

            updateCart(cart);
            logAction("Added art to the cart", user, art);

            return createStatus(true, "Art added to the cart");
        } catch (Exception e) {
            e.printStackTrace();
            return createStatus(false, "Error adding art to the cart");
        }
    }

    // Remove art from the cart
    public RegistrationStatus removeFromCart(int userId, int artId) {
        try {
            User user = userService.findUserById(userId);
            if (user == null) {
                return createStatus(false, "User not found");
            }
            Art art = artService.fetchById(artId);
            if (art == null) {
                return createStatus(false, "Art not found");
            }
            Cart cart = getOrCreateCart(user);

            cart.removeArt(art);

            updateCart(cart);
            logAction("Removed art from the cart", user, art);

            return createStatus(true, "Art removed from the cart");
        } catch (Exception e) {
            return createStatus(false, "Error removing art from the cart");
        }
    }

    // Helper method to create RegistrationStatus
    private RegistrationStatus createStatus(boolean status, String message) {
        RegistrationStatus registrationStatus = new RegistrationStatus();
        registrationStatus.setStatus(status);
        registrationStatus.setStatusMessage(message);
        return registrationStatus;
    }

    // Helper method to get or create a cart for a user
    private Cart getOrCreateCart(User user) {
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            user.setCart(cart);
            cart.setUser(user); 
            userService.reActiveUser(user); 
        }
        return cart;
    }

    // Update the cart in the database
    private void updateCart(Cart cart) {
        cartRepository.save(cart);
    }

    // Log the cart-related action
    private void logAction(String action, User user, Art art) {
        System.out.println("User: " + user.getUserName() + ", Action: " + action + ", Art: " + (art != null ? art.getTitle() : "N/A"));
    }

 // Remove art from the cart
    public RegistrationStatus deleteFromCart(int userId, int artId) {
        try {
            User user = userService.findUserById(userId);
            if (user == null) {
                return createStatus(false, "User not found");
            }
            Art art = artService.fetchById(artId);
            if (art == null) {
                return createStatus(false, "Art not found");
            }
            Cart cart = getOrCreateCart(user);

            // Implement the logic to delete the specified artId from the user's cart
            // Assuming you have a removeArt method in the Cart entity, implement it accordingly
            cart.removeArt(art);

            // Update the cart in the database
            updateCart(cart);

            // Log the action
            logAction("Deleted art from the cart", user, art);

            return createStatus(true, "Art deleted from the cart");
        } catch (Exception e) {
            return createStatus(false, "Error deleting art from the cart");
        }
    }

}
