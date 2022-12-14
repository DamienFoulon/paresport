import "./Searchbar.scss";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Searchbar(props) {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(searchInput);
  };
  return (
    <div className="searchBar">
      <i className={`${props.icon} searchBar-icon`}></i>
      <input
        type="text"
        placeholder={t(`${props.placeholder}`)}
        onChange={(e) => handleSearchInput(e)}
        name="searchInput"
        className={"searchBar-input"}
      />
    </div>
  );
}
