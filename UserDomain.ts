// PORT
export interface UserRepository {
  create(name: string, email: string): Promise<void>;
  delete(id: string): Promise<void>;
  edit(id: string, name: string): Promise<void>;
}

type UserType = {
  name: string;
  email: string;
};

// Adapter
export class MemoryUser implements UserRepository {
  users: UserType[] = [];
  constructor() {
    this.users = [];
  }

  async create(name: string, email: string): Promise<void> {
    this.users.push({ name, email });
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async edit(id: string, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

// export class DBUser implements UserRepository {}

// export class AWSS3User implements UserRepository {}

// PORT
export interface UserNotification {
  send(userName: string, email: string): Promise<void>;
}

// ADAPTER
// LogNotification
export class LogNotification implements UserNotification {
  async send(userName: string, email: string): Promise<void> {
    console.log(`Hi ${userName}, this is your email: ${email}`);
  }
}

// SMSNotification
// EmailNotification
// SlackNotification

type RepoType = "memory" | "aws" | "db";
type NotificationServiceType = "sms" | "slack" | "email" | "log";
// Domain
export class UserDomain {
  userRepo: UserRepository;
  userNotification: UserNotification;
  constructor(
    repoType: RepoType = "memory",
    notificationService: NotificationServiceType = "log"
  ) {
    if (repoType === "memory") {
      this.userRepo = new MemoryUser();
    } else {
      throw "We currently does not support this repo type";
    }
    if (notificationService === "log") {
      this.userNotification = new LogNotification();
    } else {
      throw "We currently does not support this notification";
    }
  }

  create(userName: string, email: string) {
    // create user
    this.userRepo.create(userName, email);
    this.userNotification.send(userName, email);
    // send email
    // Do it later
  }

  delete() {
    //
  }

  edit() {
    //
  }
}
