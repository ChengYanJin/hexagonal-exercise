import { User, UserRepository } from "../UserDomain";
import { RemoteDBDomain } from "../../remote-DB/RemoteDBDomain";

export class CacheMemoryUser implements UserRepository {
  remoteDBDomain: RemoteDBDomain;
  constructor(remoteDBDomain: RemoteDBDomain, users: User[] = []) {
    this.remoteDBDomain = remoteDBDomain;
  }
  create(name: string, email: string): Promise<User> {
    return this.remoteDBDomain.createUser(name, email);
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  edit(id: string, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  list(): Promise<User[]> {
    return this.remoteDBDomain.list();
  }
}
