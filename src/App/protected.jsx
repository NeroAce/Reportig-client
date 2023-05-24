import React, { useEffect, useContext } from "react";
import { AppContext } from "./warehouse/useReducer";
import { Outlet, useNavigate } from "react-router-dom";

export default function Protected() {
  const navigate = useNavigate();
  const { userDetail } = useContext(AppContext);
  useEffect(() => {
    userDetail();
  }, []);

  if (localStorage.getItem("token")) {
    return <Outlet />;
  } else {
    navigate("/");
  }
}
