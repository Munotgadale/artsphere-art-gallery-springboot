package com.cdac.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.ExhibitionDetail;
import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Exhibition;
import com.cdac.service.ExhibitionService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/exhibitions")
public class ExhibitionController {

    @Autowired
    private ExhibitionService exhibitionService;

    @PostMapping("/add")
    public ResponseEntity<RegistrationStatus> addExhibition(@RequestBody ExhibitionDetail exhibitionDetail) {
        try {
            Exhibition exhibition = new Exhibition();
            BeanUtils.copyProperties(exhibitionDetail, exhibition);

            Exhibition savedExhibition = exhibitionService.saveExhibition(exhibition);

            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(true);
            status.setStatusMessage("Exhibition added successfully!");
            status.setId(savedExhibition.getId());

            return new ResponseEntity<>(status, HttpStatus.OK);

        } catch (Exception e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage("Failed to add exhibition: " + e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Exhibition> getExhibitionById(@PathVariable int id) {
        System.out.println("Request received for exhibition ID: " + id);

        Optional<Exhibition> optionalExhibition = exhibitionService.getExhibitionById(id);

        if (optionalExhibition.isPresent()) {
            System.out.println("Exhibition found: " + optionalExhibition.get());
            return new ResponseEntity<>(optionalExhibition.get(), HttpStatus.OK);
        } else {
            System.out.println("Exhibition not found for ID: " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get/exhibitions")
    public ResponseEntity<List<Exhibition>> getAllExhibitions() {
        List<Exhibition> exhibitions = exhibitionService.getAllExhibitions();

        return new ResponseEntity<>(exhibitions, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RegistrationStatus> updateExhibition(@PathVariable int id, @RequestBody ExhibitionDetail exhibitionDetail) {
        try {
            Optional<Exhibition> optionalExhibition = exhibitionService.getExhibitionById(id);

            if (optionalExhibition.isPresent()) {
                Exhibition existingExhibition = optionalExhibition.get();
                BeanUtils.copyProperties(exhibitionDetail, existingExhibition);

                exhibitionService.updateExhibition(existingExhibition);

                RegistrationStatus status = new RegistrationStatus();
                status.setStatus(true);
                status.setStatusMessage("Exhibition updated successfully!");

                return new ResponseEntity<>(status, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage("Failed to update exhibition: " + e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RegistrationStatus> deleteExhibition(@PathVariable int id) {
        try {
            Optional<Exhibition> optionalExhibition = exhibitionService.getExhibitionById(id);

            if (optionalExhibition.isPresent()) {
                Exhibition exhibition = optionalExhibition.get();
                exhibitionService.deleteExhibitionById(exhibition.getId());

                RegistrationStatus status = new RegistrationStatus();
                status.setStatus(true);
                status.setStatusMessage("Exhibition deleted successfully!");

                return new ResponseEntity<>(status, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage("Failed to delete exhibition: " + e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }
}
