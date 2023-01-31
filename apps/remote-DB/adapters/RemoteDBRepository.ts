import { UserRepository, User } from "../CacheMemoryUser";

export class RemoteDBRepository implements UserRepository {
  users: User[];
  constructor() {
    this.users = [];
  }
  async create(name: string, email: string, id: string): Promise<User> {
    const newUser = { name, email, id };
    this.users.push(newUser);
    return newUser;
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  edit(id: string, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async list(): Promise<User[]> {
    return new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
      return this.users;
    });
  }
}
