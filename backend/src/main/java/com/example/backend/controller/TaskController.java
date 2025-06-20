package com.example.backend.controller;

import com.example.backend.dto.TaskCreateCommand;
import com.example.backend.dto.TaskDto;
import com.example.backend.mapper.TaskMapper;
import com.example.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskService taskService;
    private final TaskMapper taskMapper;

    @GetMapping
    public List<TaskDto> getTasks() {
        return taskService.getTasks().stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskDto createTask(@RequestBody TaskCreateCommand command) {
        return taskMapper.toDto(taskService.createTask(taskMapper.toEntity(command)));
    }

    @PatchMapping("/{id}")
    public TaskDto toggleTaskStatus(@PathVariable Long id) {
        return taskMapper.toDto(taskService.toggleTaskStatus(id));
    }

    @DeleteMapping
    public void deleteAll() {
        taskService.deleteAll();
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
