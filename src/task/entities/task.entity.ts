import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class Task {
  @IsNotEmpty()
  id: string = uuid();

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;

  createdAt: Date = new Date();
}
