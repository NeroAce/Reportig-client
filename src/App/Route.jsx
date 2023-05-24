import React from "react";

import { Route, Routes } from "react-router-dom";
import Navbar from "../Shared/components/Navbar";
import Home from "../Pages/lead";
import Protected from "./protected";
import Auth from "../Pages/auth";
import Students from "../Pages/students";
import EditPage from "../Pages/edit";
import Documents from "../Pages/documents";

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route element={<Auth />} path="/" />
      </Routes>

      <Routes>
        <Route element={<Protected />}>
          <Route element={<Home />} path="/lead"></Route>
          <Route element={<Students />} path="/students"></Route>
          <Route element={<EditPage />} path="/edit/:id"></Route>
          <Route element={<Documents />} path="/documents"></Route>
        </Route>
      </Routes>
    </div>
  );
}
