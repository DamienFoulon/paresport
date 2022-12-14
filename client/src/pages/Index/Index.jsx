import "./Index.scss";
import React from "react";
import { useTranslation } from "react-i18next";

import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";
import List from "../../components/List/List";
import Item from "../../components/List/Item/Item";
import Banner from "../../components/Banner/Banner";
import Match from "../../components/Match/Match";

export default function Index() {
  const { i18n, t } = useTranslation();
  const urlLang = window.location.pathname.split("/")[1];
  if (urlLang !== i18n.language) {
    i18n.changeLanguage(urlLang);
  }

  return (
    <>
      <Navbar />
      <div className="container row">
        <div className="left-container col">
          <Searchbar
            placeholder={"Search a match"}
            icon={"icon-magnifying-glass-solid"}
          />
          <List title={"Top competitions"}>
            <Item
              gameIcon={"lol"}
              competitionIcon={"lol-lec"}
              competitionName={"League of Legend LEC"}
            />
            <Item
              gameIcon={"lol"}
              competitionIcon={"lol-lcs"}
              competitionName={"League of Legend LCS"}
            />
            <Item
              gameIcon={"csgo"}
              competitionIcon={"csgo-esl"}
              competitionName={"CS:GO ESL"}
            />
            <Item
              gameIcon={"csgo"}
              competitionIcon={"csgo-esea"}
              competitionName={"CS:GO ESEA"}
            />
            <Item
              gameIcon={"valorant"}
              competitionIcon={"valorant-masters"}
              competitionName={"Valorant Masters"}
            />
            <Item
              gameIcon={"valorant"}
              competitionIcon={"valorant-cdf"}
              competitionName={"Valorant Coupe de France"}
            />
          </List>
          <List title={"Games"}>
            <Item gameIcon={"valorant"} competitionName={"Valorant"} />
            <Item gameIcon={"csgo"} competitionName={"CS:GO"} />
          </List>
        </div>
        <div className="mid-container col">
          <Banner
            title={"Get free coins"}
            description={"You can claim free coins every days !"}
          />
          <div className="biggest-daily-matchs row">
            <Match
              matchTitle={"Valorant Masters - Semi-Final"}
              matchGame={"valorant"}
              matchCompetition={"valorant-masters"}
              team1={"KCorp"}
              odd1={"1.25"}
              oddDraw={"5.00"}
              team2={"Vitality"}
              odd2={"8.75"}
            />
            <Match
              matchTitle={"CS:GO ESL - Final"}
              matchGame={"csgo"}
              matchCompetition={"csgo-esl"}
              team1={"G2"}
              odd1={"2.25"}
              oddDraw={"1.30"}
              team2={"Cloud9"}
              odd2={"0.75"}
            />
          </div>
        </div>
        <div className="right-container col"></div>
      </div>
    </>
  );
}
