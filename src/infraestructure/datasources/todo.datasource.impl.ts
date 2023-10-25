import { prisma } from "../../data";
import { TodoDaSource, CreateTodoDto, UpdateTodoDto, TodoEntity } from "../../domain";

export class TodoDatasourceImpl extends TodoDaSource {
    async create(todoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<TodoEntity | undefined> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(TodoEntity.fromObject);
    }
    async updateById(updateDto: UpdateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    async deleteById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

}