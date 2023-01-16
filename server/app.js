const express = require("express");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const { response } = require("express");

dotenv.config();
const app = new express();
const prisma = new PrismaClient();

const fetchData = async function (url) {
  console.log("fetching data from " + url);
  const dataRes = await fetch(url);
  const dataJson = await dataRes.json();
  return dataJson;
};

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

app.get("/api/valorant/matches", (req, res) => {
  let valorantMatches = fetchData(
    `https://api.pandascore.co/valorant/matches?token=${process.env.PANDASCORE_TOKEN}`
  );

  switch (req.query.sort) {
    default:
      valorantMatches.then((data) => {
        res.json(data);
      });
      break;

    case "upcoming-date":
      valorantMatches.then((data) => {
        res.json(
          data
            // sort by date nearest to farthest
            .sort((a, b) => {
              return new Date(a.begin_at) - new Date(b.begin_at);
            })
            // filter out matches that have already happened
            .filter((match) => {
              return new Date(match.begin_at) > new Date();
            })
        );
      });
      break;
  }
});

app.get("/api/rocket-league/leagues", (req, res) => {
  let rocketLeagueLeagues = fetchData(
    `https://api.pandascore.co/rocket-league/leagues?token=${process.env.PANDASCORE_TOKEN}`
  );

  switch (req.query.sort) {
    default:
      rocketLeagueLeagues.then((data) => {
        res.json(data.map((league) => league.id));
      });
      break;
  }
});

app.get("/api/rocket-league/matches", (req, res) => {
  let rocketLeagueMatches = fetchData(
    `https://api.pandascore.co/rl/matches?token=${process.env.PANDASCORE_TOKEN}`
  );

  switch (req.query.sort) {
    default:
      rocketLeagueMatches.then((data) => {
        res.json(data);
      });
      break;

    case "upcoming-date":
      rocketLeagueMatches.then((data) => {
        res.json(
          data
            // sort by date nearest to farthest
            .sort((a, b) => {
              return new Date(a.begin_at) - new Date(b.begin_at);
            })
            // filter out matches that have already happened
            .filter((match) => {
              return new Date(match.begin_at) > new Date();
            })
        );
      });
      break;
  }
});

app.get("/api/valorant/leagues", (req, res) => {
  let league = fetchData(
    `https://api.pandascore.co/valorant/leagues?token=${process.env.PANDASCORE_TOKEN}&page=1&per_page=100`
  );

  switch (req.query.sort) {
    default:
      league.then((data) => {
        res.json(
          data.map((league) => {
            return {
              id: league.id,
              name: league.name,
              series_slug: league.series.map((series) => series.slug),
              videogame_slug: league.videogame.slug,
            };
          })
        );
      });
      break;
  }
});

app.listen(8000);
