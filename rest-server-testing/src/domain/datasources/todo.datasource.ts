import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from '../dtos/todos/create-todos.dto';
import { UpdateTodoDto } from "../dtos";

export abstract class TodoDataSource {
    abstract create(todoDto: CreateTodoDto): Promise<TodoEntity>

    abstract findById(id: number): Promise<TodoEntity | undefined>

    abstract getAll(): Promise<TodoEntity[]>
    
    abstract updateById(updateDto: UpdateTodoDto): Promise<TodoEntity| undefined>

    abstract deleteById(id: number): Promise<TodoEntity>

}