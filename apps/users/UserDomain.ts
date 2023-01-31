import { v4 as uuidv4 } from "uuid";
// Entity
export type User = {
  id: string;
  name: string;
  email: string;
};

// Port
export interface UserNotifier {
  send(to: User): Promise<void>;
}

export interface UserRepository {
  create(name: string, email: string, id: string): Promise<User>;
  delete(id: string): Promise<void>;
  edit(id: string, name: string): Promise<void>;
  list(): Promise<User[]>;
}

// Domain
export class UserDomain {
  constructor(
    private userRepo: UserRepository,
    private userNotification: UserNotifier
  ) {}

  async create(name: string, email: string): Promise<User> {
    const id = uuidv4();
    const newUser = await this.userRepo.create(name, email, id);
    this.userNotification.send(newUser);
    return newUser;
  }

  async list(): Promise<Pick<User, "id" | "name">[]> {
    const users = await this.userRepo.list();
    return users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
      };
    });
  }

  delete() {}

  edit() {}
}
