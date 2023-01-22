import "./Item.scss";
import React from "react";

export default function Item(props) {
  return (
    <li>
      <div className="competition-game-icon">
        <img src={`/img/games/icons/${props.gameIcon}.png`} alt="" />
      </div>
      {props.competitionIcon && (
        <div className="competition-icon">
          <img
            src={`/img/competitions/icons/${props.competitionIcon}.png`}
            alt=""
          />
        </div>
      )}
      <p className="competition-name">{props.competitionName}</p>
    </li>
  );
}
