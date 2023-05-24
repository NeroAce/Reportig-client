import React from "react";

/*
props.options datastructure is 
options = [
    {
        value:String,
        optionName:string
    },
]
*/

export default function Components(props) {
  const type = props.type;
  const name = props.name;
  const value = props.value;
  const onChange = props.onChange;
  const rows = props.rows || "10";
  const cols = props.cols || "30";
  const selectData = props.options || undefined;
  const heading = props.heading || "Heading";
  const onClick = props.onClick;
  const warning = props.warning || " ";

  const input = [
    "text",
    "password",
    "number",
    "radio",
    "checkbox",
    "time",
    "email",
    "date",
  ];

  if (input.includes(type)) {
    return (
      <div>
        <div>{heading}</div>
        <input type={type} name={name} value={value} onChange={onChange} />
        <div>{warning}</div>
      </div>
    );
  } else if (type === "textarea") {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
      ></textarea>
    );
  } else if (type === "select" && selectData) {
    return (
      <div>
        <select value={value} onChange={onChange}>
          {selectData.map((item, index) => {
            return <option value={item.value}>{item.optionName}</option>;
          })}
        </select>
      </div>
    );
  } else if (type === "buttons") {
    return <button onClick={onClick}>{heading}</button>;
  }
}
