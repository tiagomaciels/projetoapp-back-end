import { getRepository } from "typeorm";
import { User } from "../entities/User";

type UserRequest = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
};

export class UserService {
  async create({ name, email, password }: UserRequest): Promise<User | Error> {
    const repo = getRepository(User);

    if (await repo.findOne({ email }))
      return new Error("Este E-mail já está cadastrado!");
    const user = repo.create({ name, email, password });
    await repo.save(user);
    return user;
  }

  async getOne({ id }: UserRequest) {
    const repo = getRepository(User);
    const user = await repo.findOne(id);

    if (!user) return new Error("Usuário não existe!");
    return user;
  }

  async getAll() {
    const repo = getRepository(User);
    const users = await repo.find();

    return users;
  }

  async update({ id, name, email, password }: UserRequest) {
    const repo = getRepository(User);
    const user = await repo.findOne(id);

    if (!user) return new Error("Usuário não existe!");
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? password : user.password;

    await repo.save(user);

    return user;
  }

  async delete(id: string) {
    const repo = getRepository(User);

    if (!(await repo.findOne(id))) return new Error("Usuário não existe!");
    return repo.delete(id);
  }
}
