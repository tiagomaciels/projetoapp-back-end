import { getRepository } from "typeorm";
import { Book } from "./../entities/Book";

type BookRequest = {
  id?: string;
  user_id?: string;
  title?: string;
  description?: string;
  release_date?: Date;
  created_at?: Date;
};

export class BookService {
  async create({
    title,
    description,
    release_date,
  }: BookRequest): Promise<Book | Error> {
    const repo = getRepository(Book);
    const book = repo.create({ title, description, release_date });

    await repo.save(book);
    return book;
  }

  async getOne({ id }: BookRequest) {
    const repo = getRepository(Book);
    const book = await repo.findOne(id);

    if (!book) return new Error("Livro não existe!");
    return book;
  }

  async getAll() {
    const repo = getRepository(Book);
    const books = await repo.find();

    return books;
  }

  async update({ id, title, description, release_date }: BookRequest) {
    const repo = getRepository(Book);
    const book = await repo.findOne(id);

    if (!book) return new Error("Livro não existe!");
    book.title = title ? title : book.title;
    book.description = description ? description : book.description;
    book.release_date = release_date ? release_date : book.release_date;

    await repo.save(book);
    return book;
  }

  async delete(id: string) {
    const repo = getRepository(Book);

    if (!(await repo.findOne(id))) return new Error("Livro não existe!");
    return repo.delete(id);
  }
}
