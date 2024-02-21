package com.cdac.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Message;
import com.cdac.repository.MessageRepository;

import java.util.List;
import java.util.Optional;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(int messageId) {
        return messageRepository.findById(messageId);
    }

    public Message updateMessage(Message message) {
        return messageRepository.save(message);
    }

    public void deleteMessageById(int messageId) {
        messageRepository.deleteById(messageId);
    }
}
