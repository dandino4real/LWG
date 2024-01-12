import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Description of the new task',
        completed: false,
      };

      const createdTask = {
        id: 'generated-id',
        createdAt: new Date(),
        ...createTaskDto,
      };

      jest.spyOn(tasksService, 'createTask').mockReturnValue(createdTask);

      expect(controller.createTask(createTaskDto)).toEqual(createdTask);
    });
  });
});
