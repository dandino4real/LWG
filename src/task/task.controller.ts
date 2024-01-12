import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto); 
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')        
  deleteTask(@Param('id') id: string): Task {
    return this.tasksService.deleteTask(id);
  }
}
