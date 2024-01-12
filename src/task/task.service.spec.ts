import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TaskService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task with createdAt field', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Description of the new task',
        completed: false,
      };

      const createdTask = service.createTask(createTaskDto);

      expect(createdTask).toBeDefined();
      expect(createdTask.id).toBeDefined();
      expect(createdTask.title).toEqual(createTaskDto.title);
      expect(createdTask.description).toEqual(createTaskDto.description);
      expect(createdTask.completed).toEqual(createTaskDto.completed);
      expect(createdTask.createdAt).toBeInstanceOf(Date);
    });
  });

  
});
