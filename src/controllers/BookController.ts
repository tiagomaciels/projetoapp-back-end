import { Request, Response } from "express";
import { BookService } from "./../services/BookService";

export class BookController {
  constructor(private bookService: BookService) {}

  async create(req: Request, res: Response) {
    const { title, description, release_date } = req.body;
    const result = await this.bookService.create({ title, description, release_date });

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.json(result);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.bookService.getOne({ id });

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const books = await this.bookService.getAll();

    return res.json(books);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, release_date } = req.body;
    const result = await this.bookService.update({ id, title, description, release_date });

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.bookService.delete(id);

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.status(204).end();
  }
}
