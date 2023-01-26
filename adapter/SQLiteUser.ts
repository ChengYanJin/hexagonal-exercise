import { User, UserRepository } from "../UserDomain";

// TODO
export class SQLiteUser implements UserRepository {
  constructor(private users: User[] = []) {
    this.users = [];
  }
  async create(name: string, email: string): Promise<void> {
    const id = "1";
    this.users.push({ id, name, email });
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
