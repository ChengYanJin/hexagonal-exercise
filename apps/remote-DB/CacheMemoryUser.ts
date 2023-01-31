export type User = {
  id: string;
  name: string;
  email: string;
};

// PORT for repository
export interface UserRepository {
  create(name: string, email: string, id: string): Promise<User>;
  delete(id: string): Promise<void>;
  edit(id: string, name: string): Promise<void>;
  list(): Promise<User[]>;
}

// PORT for cache
export interface CacheRepository {
  loadUsers(users: User[]): Promise<void>; //load the users to the cache from DB
  listUser(): Promise<User[] | null>;
  pushUser(users: User[]): Promise<void>;
}

// It's both ADAPTER and DOMAIN
export class CacheMemoryUser implements UserRepository {
  constructor(
    private cacheRepo: CacheRepository,
    private dbRepo: UserRepository
  ) {
    this.dbRepo.list().then((users) => {
      this.cacheRepo.loadUsers(users);
    });
  }
  async create(name: string, email: string, id: string): Promise<User> {
    //push in the DB, it's the source of truth !!
    const user = this.dbRepo.create(name, email, id);
    //invalidate the cache or list the cache
    const list = await this.dbRepo.list();
    this.cacheRepo.pushUser(list);
    return user;
  }
  async list(): Promise<User[]> {
    const cachedUsers = await this.cacheRepo.listUser();
    //if its not the cache, update the cache.
    if (cachedUsers) {
      return cachedUsers;
    } else {
      const list = await this.dbRepo.list();
      this.cacheRepo.pushUser(list);
      return list;
    }
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  edit(id: string, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
