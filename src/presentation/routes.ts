import { Router } from "express";
import { TodosController } from './todos/controller';
import { TodoRoutes } from "./todos/router";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();
        router.get('/api/todos', TodoRoutes.routes);

        return router 
    }
}