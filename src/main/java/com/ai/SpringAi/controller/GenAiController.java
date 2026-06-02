package com.ai.SpringAi.controller;

import com.ai.SpringAi.service.ChatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GenAiController {

    ChatService chatService;

    public GenAiController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }
}
