import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Query('completed') query: boolean) {
    return this.todosService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number) {
    return this.todosService.toggleCompleted(id);
  }

  @Delete()
  remove() {
    return this.todosService.removeCompleted();
  }
}
