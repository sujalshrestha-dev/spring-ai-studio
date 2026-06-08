package com.ai.SpringAi.service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RecipeService {

    private final ChatModel chatModel;

    public RecipeService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String createRecipe(String ingredients,
                               String cuisine,
                               String dietaryRestrictions) {
        var template = """
                I want to create a recipe using the following ingredients: {ingredients}.
                The cuisine type I prefer is: {cuisine}.
                Please consider the following dietary restrictions: {dietaryRestrictions}.
                Please provide me with a detailed recipe including:
                - Title
                - List of ingredients with measurements
                - Step-by-step cooking instructions
                - Estimated cooking time
                - Serving size
                """;

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Map<String, Object> params = Map.of(
                "ingredients", ingredients,
                "cuisine", cuisine.isEmpty() ? "any" : cuisine,
                "dietaryRestrictions", dietaryRestrictions.isEmpty() ? "none" : dietaryRestrictions
        );

        Prompt prompt = promptTemplate.create(params);
        return chatModel.call(prompt).getResult().getOutput().getText();
    }
}