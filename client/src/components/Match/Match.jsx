import "./Match.scss";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Match(props) {
  const { t, i18n } = useTranslation();
  return (
    <div className="biggest-daily-match">
      <div className="biggest-daily-match-header">
        <img
          src={`../../assets/img/competitions/banner/${props.matchCompetition}`}
          alt=""
        />
      </div>
      <div className="biggest-daily-match-body">
        <div className="biggest-daily-match-title row">
          <img
            src={`../../../assets/img/games/icons/${props.matchGame}`}
            alt=""
          />
          <img
            src={`../../../assets/img/competitions/icons/${props.matchCompetition}`}
            alt=""
          />
          <p>
            {props.matchTitle.split(" ").map((word) => {
              return word + " ";
            })}
          </p>
        </div>
        <div className="biggest-daily-match-teams">
          <div className="biggest-daily-match-team1">{props.team1}</div>
          <div className="biggest-daily-match-team2">{props.team2}</div>
        </div>
        <div className="biggest-daily-match-buttons">
          <button className="biggest-daily-match-button team1">
            <p className="biggest-daily-match-button-teamName">{props.team1}</p>
            <p className="biggest-daily-match-button-odds">{props.odd1}</p>
          </button>
          <button className="biggest-daily-match-button draw">
            <p className="biggest-daily-match-button-teamName">{t("Draw")}</p>
            <p className="biggest-daily-match-button-odds">{props.oddDraw}</p>
          </button>
          <button className="biggest-daily-match-button team2">
            <p className="biggest-daily-match-button-teamName">{props.team2}</p>
            <p className="biggest-daily-match-button-odds">{props.odd2}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
