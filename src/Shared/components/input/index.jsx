import React from "react";

export default function Input(props) {
  return (
    <div>
      <div>
        <label>{props.name}</label>
        <input
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
        <p>{props.warningText}</p>
      </div>
    </div>
  );
}
