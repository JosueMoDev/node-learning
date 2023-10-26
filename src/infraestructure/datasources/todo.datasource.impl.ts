import { prisma } from "../../data";
import { TodoDaSource, CreateTodoDto, UpdateTodoDto, TodoEntity } from "../../domain";

export class TodoDatasourceImpl implements TodoDaSource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        if (!todo) throw `We couldnt save todo`;

        return TodoEntity.fromObject(todo);

    }

    async findById(id: number): Promise<TodoEntity | undefined> {

        if (isNaN(id)) throw 'ID argument is not a number';

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) throw `Todo with id ${id} not found`;

        return TodoEntity.fromObject(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(TodoEntity.fromObject);
    }

    async updateById(updateDto: UpdateTodoDto): Promise<TodoEntity | undefined> {
        const todo = await this.findById(updateDto.id);
        if ( !todo ) throw `we couldnt find any todo with id ${updateDto.id}`;

        const updatedTodo = await prisma.todo.update({
        where: { id: updateDto.id },
        data: updateDto!.values
        });

        return TodoEntity.fromObject(updatedTodo)
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deleted = await prisma.todo.delete({
            where: { id }
        });

        return TodoEntity.fromObject(deleted);

    }

}