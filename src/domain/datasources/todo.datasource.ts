import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from '../dtos/todos/create-todos.dto';
import { UpdateTodoDto } from "../dtos";

export abstract class TodoDaSource {
    abstract create(todoDto: CreateTodoDto): Promise<TodoEntity>

    abstract findById(id: number): Promise<TodoEntity | undefined>

    abstract getAll(): Promise<TodoEntity[]>
    
    abstract updateById(updateDto: UpdateTodoDto): Promise<TodoEntity>

    abstract deleteById(id: number): Promise<TodoEntity>

}