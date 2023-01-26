import { User, UserNotification } from "../UserDomain";

export class LogNotification implements UserNotification {
  async send(to: User): Promise<void> {
    console.log(`Hi ${to.name}, this is your email: ${to.email}`);
  }
}
