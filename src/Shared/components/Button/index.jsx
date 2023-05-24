import React from "react";

import "./style.css";

export default function Button(props) {
  const type = props.type;

  if (type === "normal") {
    return (
      <div>
        <button name={props.name} onClick={props.onClick}>
          {props.text}
        </button>
      </div>
    );
  }
}
