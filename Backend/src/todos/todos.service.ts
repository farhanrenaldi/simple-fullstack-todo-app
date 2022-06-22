import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './entities/todo.entity';

@Injectable()
export class TodosService {

  constructor(
    @InjectRepository(Todos)
    private repo: Repository<Todos>
  ) {}


  create(createTodoDto: CreateTodoDto) {
    const todo = this.repo.create(createTodoDto);
    return this.repo.save(todo);
  }

  findAll(status?: boolean) {
    if(!status){
      return this.repo.find();
    }
    return this.repo.find({isCompleted:status})
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  async toggleCompleted(id: number) {
    const todo = await this.repo.findOne(id);
    if(!todo) {
      throw new NotFoundException('Todo not found')
    }
    let state = todo.isCompleted;
    return this.repo.save({ ...todo, isCompleted: !state })
  }

  removeCompleted() {
    let toDelete = this.repo.findOne({isCompleted: true});
    if(toDelete) {
      return this.repo.delete({isCompleted: true})
    }
    throw new NotFoundException('No task is completed')
  }
}
