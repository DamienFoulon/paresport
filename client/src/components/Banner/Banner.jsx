import "./Banner.scss";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Banner(props) {
  const { t } = useTranslation();
  return (
    <div className="banner">
      <h1>{t(`${props.title}`)}</h1>
      <p>{t(`${props.description}`)}</p>
    </div>
  );
}
