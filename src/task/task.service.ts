import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, completed } = createTaskDto;
    const newTask: Task = {
      id: uuid(),
      title,
      description,
      completed,
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updatedTask: UpdateTaskDto): Task {
    try {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      const existingTask = this.tasks[taskIndex];

      const updatedTaskObject: Task = {
        id: existingTask.id,
        title: updatedTask.title || existingTask.title,
        description: updatedTask.description || existingTask.description,
        completed: updatedTask.completed ?? existingTask.completed,
        createdAt: existingTask.createdAt,
      };

      this.tasks[taskIndex] = updatedTaskObject;

      return updatedTaskObject;
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    const deletedTask = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);

    return deletedTask;
  }
}
