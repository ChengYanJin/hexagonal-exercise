import { User, UserNotifier } from "../UserDomain";

export class LogNotification implements UserNotifier {
  async send(to: User): Promise<void> {
    console.log(`Hi ${to.name}, this is your email: ${to.email}`);
  }
}
