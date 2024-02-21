package com.cdac.service;

import com.cdac.entity.Address;
import com.cdac.entity.Art;
import com.cdac.entity.User;
import com.cdac.repository.AddressRepository;
import com.cdac.repository.ArtRepository;
import com.cdac.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

	@Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ArtRepository artRepository;

    @Autowired
    private UserRepository userRepository;

    // Service method to add a new address
    public Address addAddress(Address address, int artId, int userId) {
        // Check if the associated Art exists
        Art art = artRepository.findById(artId).orElse(null);
        if (art == null) {
            throw new EntityNotFoundException("Art with ID " + artId + " not found");
        }

        // Check if the associated User exists
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new EntityNotFoundException("User with ID " + userId + " not found");
        }

        // Set the associated Art and User
        address.setArt(art);
        address.setUser(user);

        // Save the Address
        return addressRepository.save(address);
    }

    // Service method to get a list of all addresses
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    // Service method to get address by ID
    public Address getAddressById(Long addressId) {
        Optional<Address> optionalAddress = addressRepository.findById(addressId);
        return optionalAddress.orElse(null);
    }

    // Service method to update an existing address
    public Address updateAddress(Address address) {
        // Check if the address with the given ID exists before updating
        if (addressRepository.existsById(address.getAddressId())) {
            return addressRepository.save(address);
        }
        return null; // Handle non-existent address case
    }

    // Service method to delete an address by ID
    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }
}
