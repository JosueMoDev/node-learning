import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
    abstract create(todoDto: CreateTodoDto): Promise<TodoEntity>

    abstract findById(id: number): Promise<TodoEntity | undefined>

    abstract getAll(): Promise<TodoEntity[]>
    
    abstract updateById(updateDto: UpdateTodoDto): Promise<TodoEntity>

    abstract deleteById(id: number): Promise<TodoEntity>

}