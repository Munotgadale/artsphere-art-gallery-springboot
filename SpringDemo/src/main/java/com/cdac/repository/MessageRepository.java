package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>{

}
