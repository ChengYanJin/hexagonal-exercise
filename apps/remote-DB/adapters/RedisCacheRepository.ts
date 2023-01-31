import { CacheRepository, User } from "../CacheMemoryUser";
import { createClient } from "redis";

export class RedisCacheRepository implements CacheRepository {
  client = createClient();
  constructor() {
    this.client.connect();
  }
  async loadUsers(users: User[]): Promise<void> {
    await this.client.set("users", JSON.stringify(users));
  }

  async listUser(): Promise<User[] | null> {
    const test = await this.client.get("users");
    if (!test) {
      return null;
    }
    const obj = JSON.parse(test);
    return obj;
  }
  async pushUser(users: User[]): Promise<void> {
    await this.client.set("users", JSON.stringify(users));
  }
}
