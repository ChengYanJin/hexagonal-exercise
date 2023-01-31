import express from "express";
import { RemoteDBRepository } from "./apps/remote-DB/adapters/RemoteDBRepository";
import { RedisCacheRepository } from "./apps/remote-DB/adapters/RedisCacheRepository";
import { CacheMemoryUser } from "./apps/remote-DB/CacheMemoryUser";
import { LogNotification } from "./apps/users/adapters/LogNotification";
import { MemoryUser } from "./apps/users/adapters/MemoryUser";
import { UserDomain } from "./apps/users/UserDomain";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

const memoryRepo = new MemoryUser();
const logService = new LogNotification();

const cacheRepo = new RedisCacheRepository();
const dbRepo = new RemoteDBRepository();
const cacheUser = new CacheMemoryUser(cacheRepo, dbRepo);

// If we want to switch the store of user from memory to cache, we only need to change this.
// const userDomain = new UserDomain(memoryRepo, logService);
const userDomain = new UserDomain(cacheUser, logService);

app.get("/user", (req, res) => {
  // Create User
  // Domain
  // create-user in database
  // send notification
  if (
    typeof req.query.name === "string" &&
    typeof req.query.email === "string" &&
    req.query.name &&
    req.query.email
  ) {
    userDomain.create(req.query.name, req.query.email);
    res.send("We are going to create a user for you, please wait !");
  } else {
    res.send({ message: "Please provide name and email" });
  }
});

app.get("/users", async (req, res) => {
  const users = await userDomain.list();
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
