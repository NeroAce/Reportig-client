import React from "react";
import "./style.css";

export default function Modal({ children }) {
  return (
    <div>
      <div>
        <div className="ccs-bacground"></div>

        <div className="ccs-div">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
