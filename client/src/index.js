import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import "./lang";
import Frontend from "./routes/frontend";
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RecoilRoot>
        <Frontend />
    </RecoilRoot>
);
