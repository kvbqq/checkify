package com.example.backend.mapper;

import com.example.backend.dto.TaskCreateCommand;
import com.example.backend.dto.TaskDto;
import com.example.backend.model.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskDto toDto(Task task);

    Task toEntity(TaskCreateCommand command);
}
