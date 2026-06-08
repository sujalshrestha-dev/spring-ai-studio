package com.ai.SpringAi.service;

import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    private final OpenAiImageModel openAiImageModel;

    public ImageService(OpenAiImageModel openAiImageModel) {
        this.openAiImageModel = openAiImageModel;
    }

    public ImageResponse generateImage(
            String prompt,
            String quality,
            Integer width,
            Integer height,
            Integer n,
            String model
    ) {
        ImagePrompt imagePrompt = new ImagePrompt(
                prompt,
                OpenAiImageOptions.builder()
                        .model(model)
                        .quality(quality)
                        .width(width)
                        .height(height)
                        .N(n)
                        .build()
        );

        return openAiImageModel.call(imagePrompt);
    }
}