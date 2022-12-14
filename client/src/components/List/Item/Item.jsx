import "./Item.scss";
import React from "react";

export default function Item(props) {
  return (
    <li>
      <div className="competition-game-icon">
        <img src={`../../../assets/img/games/icons/${props.gameIcon}`} alt="" />
      </div>
      {props.competitionIcon && (
        <div className="competition-icon">
          <img
            src={`../../../assets/img/competitions/icons/${props.competitionIcon}`}
            alt=""
          />
        </div>
      )}
      <p className="competition-name">{props.competitionName}</p>
    </li>
  );
}
