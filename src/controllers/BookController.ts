import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Book } from "../entities/Book";
import { User } from "../entities/User";

export class BookController {
  async create(req: Request, res: Response) {
    const { user_id } = req.params;
    const { title, description, release_date } = req.body;
    const repo = getRepository(Book);
    const book = repo.create({ user_id, title, description, release_date });

    await repo.save(book);
    return res.status(201).json({
      message: `Livro ${book.title} cadastrado com sucesso!`,
      book,
    });
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const repo = getRepository(Book);
    const book = await repo.findOne(id);

    if (!book) return res.status(404).json("Livro não existe!");

    return res.status(200).json(book);
  }

  async getAll(req: Request, res: Response) {
    const { user_id } = req.params;
    const repo = getRepository(User);
    const user = await repo.findOne({
      where: { id: user_id },
      select: ["id", "name", "email"],
      relations: ["books"],
    });

    if (!user) return res.status(404).json("Usuário não existe!");

    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, release_date } = req.body;
    const repo = getRepository(Book);
    const book = await repo.findOne(id);

    if (!book) return res.status(404).json("Livro não existe!");

    book.title = title ? title : book.title;
    book.description = description ? description : book.description;
    book.release_date = release_date ? release_date : book.release_date;

    await repo.save(book);
    return res
      .status(200)
      .json({ message: `Livro ${book.title} atualizado com sucesso!`, book });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const repo = getRepository(Book);
    const book = await repo.findOne(id);

    if (!book) return res.status(404).json("Livro não existe!");

    await repo.delete(id);
    return res.status(204).end();
  }
}
