package com.orbital.stutotu.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orbital.stutotu.model.ChatMessage;
import com.orbital.stutotu.repository.ChatMessageRepository;

@Service
public class ChatMessageService {
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public List<ChatMessage> getChatMessages(String user1, String user2) {
        List<ChatMessage> messages = chatMessageRepository.findByFromAndTo(user1, user2);
        messages.addAll(chatMessageRepository.findByToAndFrom(user1, user2));
        messages.sort(Comparator.comparingLong(ChatMessage::getTimestamp)); // Sort by timestamp
        return messages;
    }

    public ChatMessage saveChatMessage(ChatMessage message) {
        message.setTimestamp(System.currentTimeMillis());
        return chatMessageRepository.save(message);
    }
}