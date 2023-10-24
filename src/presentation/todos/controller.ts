import { Request, Response } from "express";

export class TodosController {
    constructor() { }
    
    public getTodos = (req: Request, res: Response) => {
        res.json([
            { id: 1, text: 'Buy Milk', createdAt: new Date() },
            { id: 2, text: 'Buy Caffe', createdAt: null },
            { id: 3, text: 'Buy Chesse', createdAt: null }
        ]);
    }
}