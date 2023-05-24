import React from "react";

import "./style.css";

export default function ActionButton(props) {
  return (
    <div>
      <button onClick={props.openmodal}>edit</button>
      <button onClick={props.deleteMethod}>Delete</button>
    </div>
  );
}
