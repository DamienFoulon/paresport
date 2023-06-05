import "./List.scss";
import React from "react";
import { useTranslation } from "react-i18next";

export default function List(props) {
  const { t } = useTranslation();
  return (
    <div className={`list${props.className ? ' ' + props.className+'-container' : ''}`}>
      <h1>{t(`${props.title}`)}</h1>
      <ul className={`${props.className ? ' ' + props.className : ''}`}>
          {props.children}
      </ul>
    </div>
  );
}
