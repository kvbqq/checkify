package com.example.backend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class TaskCreateCommand {
    private String title;
    private String description;
}
