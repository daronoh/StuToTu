package com.orbital.stutotu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orbital.stutotu.model.ChatMessage;
import com.orbital.stutotu.repository.ChatMessageRepository;
import com.orbital.stutotu.service.ChatMessageService;

@RestController
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private ChatMessageService chatMessageService;

    @MessageMapping("/chat")
    public void sendMessage(@Payload ChatMessage message) {
        chatMessageRepository.save(message);
    }

    @GetMapping("/api/chat/messages")
    public List<ChatMessage> getChatMessages(@RequestParam String from, @RequestParam String to) {
        return chatMessageService.getChatMessages(from, to);
    }
}
