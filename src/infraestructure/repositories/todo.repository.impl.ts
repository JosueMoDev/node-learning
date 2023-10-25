import { CreateTodoDto, TodoDaSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl extends TodoRepository {


    create(todoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<TodoEntity | undefined> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<TodoEntity[]> {
        throw new Error("Method not implemented.");
    }
    updateById(updateDto: UpdateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

}