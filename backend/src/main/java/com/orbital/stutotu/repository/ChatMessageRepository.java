package com.orbital.stutotu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orbital.stutotu.model.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByFromAndTo(String from, String to);
    List<ChatMessage> findByToAndFrom(String to, String from);
}
