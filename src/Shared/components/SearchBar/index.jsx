import React, { useEffect, useRef, useState } from "react";

import "./style.css";

let data = [
  "apple",
  "banana",
  "orange",
  "pear",
  "apricot",
  "ananas",
  "Acerola",
  "Avocado",
  "Acai",
  "Almond",
  "Annona",
  "Amla",
  "Aronia",
  "Aubergine",
  "African cherry orange",
  "Asian pear",
  "American elderberry",
  "Alphonso mango",
  "Amalfi lemon",
  "Ambarella",
  "Amazon grape",
  "Angelica fruit",
  "Asaí palm fruit",
  "Atlas fig",
];

export default function SearchBar(props) {
  const [matchData, setMatchData] = useState([]);

  data = props.data;

  return (
    <div className="input-div">
      <input
        type="text"
        name={props.name}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
          if (e.target.value !== "" && !matchData.includes(e.target.value)) {
            setMatchData(
              data.filter((str) =>
                str.toLowerCase().startsWith(e.target.value.toLowerCase())
              )
            );
          } else {
            setMatchData([]);
          }
        }}
      />
      <button
        onClick={() => {
          props.searchbtnClick();
        }}
      >
        Search
      </button>

      {matchData.length > 0 && (
        <div className="autocomplete-div bx-sdow">
          {matchData.slice(0, 10).map((item) => {
            return (
              <div
                onClick={() => {
                  props.onChange(item);
                  setMatchData([]);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}

      {/* export button */}
      {props.export === true && (
        <button onClick={() => props.exportbtnClick()}>Export</button>
      )}
    </div>
  );
}
