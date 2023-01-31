import { User, UserRepository } from "../UserDomain";

export class MemoryUser implements UserRepository {
  constructor(private users: User[] = []) {
    this.users = [];
  }
  async create(name: string, email: string, id: string): Promise<User> {
    const newUser = { name, email, id };
    this.users.push(newUser);
    return newUser;
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async edit(id: string, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async list(): Promise<User[]> {
    return this.users;
  }
}
