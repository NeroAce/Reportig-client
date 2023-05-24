import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../../App/warehouse/useReducer";
import Popper from "../poper";

import "./styles.css";

export default function Navbar() {
  const { name, position } = useContext(AppContext);

  function Clickable() {
    return (
      <div>
        <button className="logout-div">Menu</button>
      </div>
    );
  }

  return (
    <div className="navbar-main">
      <div className="navbar-title">SomeTime</div>
      <div></div>
      <div>
        <Popper clickable={<Clickable />}>
          <div>
            <div className="navbar-userName">{name}</div>
            <div className="navbar-work">{position}</div>
          </div>
        </Popper>
      </div>
      <Outlet />
    </div>
  );
}
