import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const repo = getRepository(User);
    const user = repo.create({ name, email, password });

    if (await repo.findOne({ email }))
      return res
        .status(400)
        .json({ message: "Este E-mail já está cadastrado!" });

    await repo.save(user);
    return res.status(201).json({
      message: `Usuário ${user.name} cadastrado com sucesso!`,
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    });
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const repo = getRepository(User);
    const user = await repo.findOne({
      where: { id: id },
      select: ["id", "name", "email", "created_at"],
    });

    if (!user) return res.status(404).json("Usuário não existe!");

    return res.json(user);
  }

  async getAll(req: Request, res: Response) {
    const repo = getRepository(User);
    const users = await repo.find({
      select: ["id", "name", "email", "created_at"],
    });

    return res.json(users);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const repo = getRepository(User);
    const user = await repo.findOne(id);

    if (!user) return res.status(404).json("Usuário não existe!");

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? password : user.password;
    await repo.save(user);
    return res
      .status(200)
      .json({
        message: `Usuário ${user.name} atualizado com sucesso!`,
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const repo = getRepository(User);
    const user = await repo.findOne({
      where: { id: id },
      select: ["id", "name", "email"],
    });
    if (!user) return res.status(404).json("Usuário não existe!");

    await repo.delete(id);
    return res.status(204).end();
  }
}
