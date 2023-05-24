import DatePicker from "react-datepicker";
import React from "react";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePick(props) {
  return (
    <DatePicker
      selected={props.date}
      onChange={(date) =>
        date !== null ? props.setDate(date) : props.setDate("")
      }
    />
  );
}
