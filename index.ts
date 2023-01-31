import express from "express";
import { RedisCacheRepository } from "./apps/remote-DB/adapters/RedisCacheRepository";
import { RemoteDBRepository } from "./apps/remote-DB/adapters/RemoteDBRepository";
import { RemoteDBDomain } from "./apps/remote-DB/RemoteDBDomain";
import { CacheMemoryUser } from "./apps/users/adapters/CacheMemoryUser";
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
const remoteDBDomain = new RemoteDBDomain(cacheRepo, dbRepo);

const cacheUser = new CacheMemoryUser(remoteDBDomain);
// const userDomain = new UserDomain(memoryRepo, logService);
const userDomain = new UserDomain(cacheUser, logService);

// POST /user
// 201 OK or KO
// { userId: 'xcdfws' userName: 'yanjin' }

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
  console.log("users", users);
  res.send(users);
  // [
  //   { userName: "yanjin", userId: "vsdvsd" },
  //   { userName: "gdfg", userId: "fdfg" },
  // ];
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Create user
// when we create user -> send a email
// With hexagonal architecture

// User can be created via:
// DB <=> (Keycloak)
// API <=> (Mock)
// MemoryUser <=> (CLI)

// Send notification via:
// SMS <=> (Keycloak)
// Slack <=> (Mock)
// Email <=> (CLI)
// Log
