package com.cdac.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.MessageDetail;
import com.cdac.dto.RegistrationStatus;
import com.cdac.entity.Message;
import com.cdac.service.MessageService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/add")
    public ResponseEntity<RegistrationStatus> addMessage(@RequestBody MessageDetail messageDetail) {
        try {
            Message message = new Message();
            BeanUtils.copyProperties(messageDetail, message);

            Message savedMessage = messageService.createMessage(message);

            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(true);
            status.setStatusMessage("Message added successfully!");
            status.setId(savedMessage.getId());

            return new ResponseEntity<>(status, HttpStatus.OK);

        } catch (Exception e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage("Failed to add message: " + e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable int id) {
        Optional<Message> optionalMessage = messageService.getMessageById(id);

        return optionalMessage.map(message -> new ResponseEntity<>(message, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/get/messages")
    public ResponseEntity<List<Message>> getAllMessages() {
        List<Message> messages = messageService.getAllMessages();

        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RegistrationStatus> updateMessage(@PathVariable int id, @RequestBody MessageDetail messageDetail) {
        try {
            Optional<Message> optionalMessage = messageService.getMessageById(id);

            if (optionalMessage.isPresent()) {
                Message existingMessage = optionalMessage.get();
                BeanUtils.copyProperties(messageDetail, existingMessage);

                messageService.updateMessage(existingMessage);

                RegistrationStatus status = new RegistrationStatus();
                status.setStatus(true);
                status.setStatusMessage("Message updated successfully!");

                return new ResponseEntity<>(status, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage("Failed to update message: " + e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RegistrationStatus> deleteMessage(@PathVariable int id) {
        try {
            Optional<Message> optionalMessage = messageService.getMessageById(id);

            if (optionalMessage.isPresent()) {
                Message message = optionalMessage.get();
                messageService.deleteMessageById(message.getId());

                RegistrationStatus status = new RegistrationStatus();
                status.setStatus(true);
                status.setStatusMessage("Message deleted successfully!");

                return new ResponseEntity<>(status, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            RegistrationStatus status = new RegistrationStatus();
            status.setStatus(false);
            status.setStatusMessage("Failed to delete message: " + e.getMessage());

            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }
}
