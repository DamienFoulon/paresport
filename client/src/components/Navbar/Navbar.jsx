import "./Navbar.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  return (
    <header>
      <div className="preventHeadband">
        <h1>
          {t(
            "Warning: This site is purely fictitious, no money transaction is possible."
          )}
        </h1>
        <p>
          {t(
            "Please understand, however, that playing on any other platform may be addictive."
          )}
          <br />
          {t(
            "If you think you have a problem, please consult the player info service site: "
          )}
          &nbsp;
          <a
            href="https://www.joueurs-info-service.fr/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.afjv.org/
          </a>
        </p>
      </div>
      <div className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <Link to="/"> Paresport </Link>
          </div>
          <Link to="/league_of_legends"> LoL </Link>
          <Link to="/valorant"> Valorant </Link>
          <Link to="/csgo"> CS:GO </Link>
          <Link to="/all_scenes">{t("All")}...</Link>
        </div>
        <div className="navbar-right">
          <Link to="/login" className={"navbar-registerBtn navbar-btn"}>
            {t("Register")}
          </Link>
          <Link to="/register" className={"navbar-loginBtn navbar-btn"}>
            {t("Login")}
          </Link>
        </div>
      </div>
    </header>
  );
}
