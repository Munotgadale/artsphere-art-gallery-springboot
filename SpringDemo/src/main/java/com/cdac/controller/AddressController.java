package com.cdac.controller;

import com.cdac.entity.Address;
import com.cdac.service.AddressService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    // Endpoint to add a new address
    @PostMapping("/add/{newAddressArtId}/{newid}")
    public ResponseEntity<Address> addData(@RequestBody Address address,
                                           @PathVariable("newAddressArtId") int newAddressArtId,
                                           @PathVariable("newid") int newid) {
        try {
            // Call the service method with the provided sample data
            Address addedAddress = addressService.addAddress(address, newAddressArtId, newid);
            return ResponseEntity.ok(addedAddress);
        } catch (EntityNotFoundException e) {
            // Handle the case where the associated Art or User is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



    // Endpoint to get a list of all addresses
    @GetMapping("/list")
    public List<Address> getAllAddresses() {
        return addressService.getAllAddresses();
    }

    // Endpoint to get address by ID
    @GetMapping("/{addressId}")
    public Address getAddressById(@PathVariable Long addressId) {
        return addressService.getAddressById(addressId);
    }

    // Endpoint to update an existing address
    @PutMapping("/update")
    public Address updateAddress(@RequestBody Address address) {
        return addressService.updateAddress(address);
    }

    // Endpoint to delete an address by ID
    @DeleteMapping("/delete/{addressId}")
    public void deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
    }
}
