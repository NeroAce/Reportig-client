import React from "react";
import Multiselect from "multiselect-react-dropdown";
import "./style.css";

export default function MultiSelectDropdown(props) {
  const food = props.data;
  return (
    <div className="multiSelect">
      <Multiselect
        isObject={false}
        id="css_custom_input"
        onRemove={(event) => {
          props.onChange(event);
        }}
        onSelect={(event) => {
          props.onChange(event);
        }}
        singleSelect={props.singleSelect ? true : false}
        options={food}
        showCheckbox={true}
        avoidHighlightFirstOption={true}
        style={{
          multiselectContainer: {
            // To change css for multiselect (Width,height,etc..)
          },
          searchBox: {
            fontSize: "12px",
            minHeight: "10px",
            padding: "0",
            borderRadius: "0",
            borderColor: "black",
          },
          chips: {
            // To change css chips(Selected options)
            background: "#1C4885",
            borderRadius: "0",
          },
          optionContainer: {
            // To change css for option container
            borderRadius: "0",
          },
        }}
      />
    </div>
  );
}
