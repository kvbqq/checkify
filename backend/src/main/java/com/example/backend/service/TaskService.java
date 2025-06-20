package com.example.backend.service;

import com.example.backend.model.Task;
import com.example.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task toggleTaskStatus(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow();
        task.toggleStatus();
        return taskRepository.save(task);
    }

    public void deleteAll() {
        taskRepository.deleteAll();
    }

    public void deleteTask(Long id) {
       Task task = taskRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("bład"));
       taskRepository.delete(task);
    }
}
