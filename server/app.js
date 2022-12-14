const express = require("express");
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const app = new express();
const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/assets/img/games/icons/:name", async (req, res) => {
  const name = req.params.name;
  res.sendFile(`./assets/img/games/icons/${name}.png`, { root: __dirname });
});

app.get("/assets/img/competitions/icons/:name", async (req, res) => {
  const name = req.params.name;
  res.sendFile(`./assets/img/competitions/icons/${name}.png`, {
    root: __dirname,
  });
});

app.get("/assets/img/competitions/banner/:name", async (req, res) => {
  const name = req.params.name;
  res.sendFile(`./assets/img/competitions/banner/${name}.png`, {
    root: __dirname,
  });
});

app.listen(8000);
