package com.orbital.stutotu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/api/messages")
    public void sendMessage(@RequestBody ChatMessage message) {
        chatMessageService.saveChatMessage(message);
    }

    @GetMapping("/api/messages")
    public ResponseEntity<List<ChatMessage>> getChatMessages(@RequestParam String from, @RequestParam String to) {
        try {
            List<ChatMessage> messages = chatMessageService.getChatMessages(from, to);
            return ResponseEntity.ok(messages);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
