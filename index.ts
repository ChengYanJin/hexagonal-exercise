import express from "express";
import { MemoryUser, UserDomain } from "./UserDomain";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  console.log("toto");
  res.send("Hello World!");
});

const userDomain = new UserDomain();

app.get("/new-user", (req, res) => {
  // Create User
  // Domain
  // create-user in database
  // send notification
  if (req.query.name && req.query.email) {
    userDomain.create("yanjin", "yanjin@test.com");
    res.send("We are going to create a user for you, please wait !");
  } else {
    res.send({ message: "Please provide name and email" });
  }
});

app.get("/users", (req, res) => {
  res.send({ message: "WIP" });
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
