// What is this ?
export type User = {
  id: string;
  name: string;
  email: string;
};

// Port
export interface UserNotification {
  send(to: User): Promise<void>;
}

export interface UserRepository {
  create(name: string, email: string): Promise<User>;
  delete(id: string): Promise<void>;
  edit(id: string, name: string): Promise<void>;
  list(): Promise<User[]>;
}

// Domain
export class UserDomain {
  userRepo: UserRepository;
  userNotification: UserNotification;
  constructor(repo: UserRepository, notificationService: UserNotification) {
    if (repo && notificationService) {
      this.userRepo = repo;
      this.userNotification = notificationService;
    } else {
      throw "Please provide a repo and notificationService";
    }
  }

  async create(name: string, email: string) {
    // create user
    const newUser = await this.userRepo.create(name, email);
    this.userNotification.send(newUser);
    // send email
    // Do it later
  }

  delete() {}

  edit() {}

  async list(): Promise<Pick<User, "id" | "name">[]> {
    const users = await this.userRepo.list();

    return users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
      };
    });
  }
}
