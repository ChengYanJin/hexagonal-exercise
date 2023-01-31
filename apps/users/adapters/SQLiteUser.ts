import { User, UserRepository } from "../UserDomain";
import { v4 as uuidv4 } from "uuid";

export class SQLiteUser implements UserRepository {
  constructor(private users: User[] = []) {
    this.users = [];
  }
  async create(name: string, email: string): Promise<User> {
    const newUser = { id: uuidv4(), name: name, email: email };
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
