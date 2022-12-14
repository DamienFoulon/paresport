import "./List.scss";
import React from "react";
import { useTranslation } from "react-i18next";

export default function List(props) {
  const { t } = useTranslation();
  return (
    <div className="list">
      <h1>{t(`${props.title}`)}</h1>
      <ul>{props.children}</ul>
    </div>
  );
}
