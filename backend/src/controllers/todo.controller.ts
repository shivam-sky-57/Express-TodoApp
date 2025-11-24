import { Request, Response } from "express";
import {prisma} from "../lib/prisma"

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

export const addTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  const todo = await prisma.todo.create({
    data: { title }
  });

  res.json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  const updated = await prisma.todo.update({
    where: { id },
    data: { completed }
  });

  res.json(updated);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await prisma.todo.delete({
    where: { id }
  });

  res.json({ message: "Deleted" });
};
