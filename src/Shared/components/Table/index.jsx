import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import "./style.css";
import loadingGif from "./resource/ZZ5H.gif";

export default function TableComponent(props) {
  const [order, setOrder] = useState({ name: "", asc: true });
  const list = [];

  if (!props.loading) {
    return (
      <div>
        <Table striped bordered hover>
          <thead className="thead">
            <tr>
              {props.column.map((item, index) => {
                let keys = item.key;
                list.push(keys);
                return (
                  <td key={index}>
                    {item.sort && (
                      <button
                        onClick={() => {
                          setOrder((prevOrder) => ({
                            ...prevOrder,
                            name: item["title"],
                            asc: !prevOrder.asc,
                          }));

                          if (
                            order.name === item["title"] &&
                            order.asc === true
                          ) {
                            props.button((prevValue) => ({
                              ...prevValue,
                              name: item["key"],
                              type: "asc",
                            }));
                          }
                          if (
                            order.name === item["title"] &&
                            order.asc === false
                          ) {
                            props.button((prevValue) => ({
                              ...prevValue,
                              name: item["key"],
                              type: "desc",
                            }));
                          }
                        }}
                      >
                        {item["title"]}

                        <span
                          className={
                            order.name === item["title"] && order.asc === false
                              ? "highlightD"
                              : "highlighNone"
                          }
                        >
                          ↓
                        </span>
                        <span
                          className={
                            order.name === item["title"] && order.asc === true
                              ? "highlightD"
                              : "highlighNone"
                          }
                        >
                          ↑
                        </span>
                      </button>
                    )}
                    {!item.sort && <div>{item["title"]}</div>}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {props.data.map((dataitem, index) => {
              return (
                <tr key={index}>
                  {list.map((item, newindex) => {
                    if ("formating" in props.column[newindex]) {
                      return (
                        <td key={newindex}>
                          {props.column[newindex].formating(
                            dataitem[item],
                            index,
                            dataitem
                          )}
                        </td>
                      );
                    } else {
                      return <td>{dataitem[item]}</td>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        {props.pagination && (
          <div className="pager-div">
            <div className="pager-div-desc">Row per page</div>
            <select
              className="ppr-select"
              name={props.name}
              id="rpp"
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>

            <div className="ppr-page">{`${props.page}-${props.totalPages}`}</div>

            <button
              className="ppr-page-button"
              onClick={() => {
                if (props.page > 1) {
                  props.setPage(props.page - 1);
                }
              }}
            >
              {"<"}
            </button>
            <div className="ppr-currentPage-div">{props.page}</div>
            <button
              className="ppr-page-button"
              onClick={() => {
                if (props.page < props.totalPages) {
                  props.setPage(props.page + 1);
                }
              }}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="loading-div">
        <img className="loading-img" src={loadingGif} alt="loading" />
      </div>
    );
  }
}
