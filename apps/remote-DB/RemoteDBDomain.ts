export type User = {
  id: string;
  name: string;
  email: string;
};

// PORT for repository
export interface UserRepository {
  create(name: string, email: string): Promise<User>;
  delete(id: string): Promise<void>;
  edit(id: string, name: string): Promise<void>;
  list(): Promise<User[]>;
}

// PORT for cache
export interface CacheRepository {
  //
  listUser(): Promise<User[] | null>;
  pushUser(users: User[]): Promise<void>;
}

// DOMAIN
export class RemoteDBDomain {
  cacheRepo: CacheRepository;
  dbRepo: UserRepository;
  constructor(cache: CacheRepository, db: UserRepository) {
    this.cacheRepo = cache;
    this.dbRepo = db;
  }

  async createUser(name: string, email: string): Promise<User> {
    //push in the DB, it's the source of truth !!
    const user = this.dbRepo.create(name, email);
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
}
