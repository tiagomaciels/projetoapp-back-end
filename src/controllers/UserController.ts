import { Request, Response } from "express";
import { UserService } from "./../services/UserService";

export class UserController {
  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const result = await this.userService.create({ name, email, password });

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.json(result);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.userService.getOne({ id });

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const users = await this.userService.getAll();

    return res.json(users);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const result = await this.userService.update({ id, name, email, password });

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.userService.delete(id);

    if (result instanceof Error) return res.status(400).json(result.message);

    return res.status(204).end();
  }
}
