import { CreateTodoDto, TodoDaSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {


    constructor(
        private readonly datasource: TodoDaSource
    ){}

    create(todoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(todoDto);
    }
    findById(id: number): Promise<TodoEntity | undefined> {
        return this.datasource.findById(id);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    updateById(updateDto: UpdateTodoDto): Promise<TodoEntity| undefined> {
        return this.datasource.updateById(updateDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}