import React, { useEffect, useState } from "react";
import { loginPost } from "../../Shared/utlts/requests";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import loadingGif from "../../App/resources/images/ZZ5H.gif";

import "./styles.css";

let initialValue = {
  username: "",
  password: "",
};

const loginSchema = yup.object({
  username: yup
    .string()
    .required("This field is required")
    .email("Invalid email"),
  password: yup
    .string()
    .min(6, "Model must be at least 6 characters")
    .required("This field is required"),
});

export default function Auth() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/lead");
    }
  }, [status]);

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await loginPost(
        "https://articlemanager-production.up.railway.app/auth/login",
        values,
        setStatus
      );
      console.log(status);
    },
  });

  return (
    <div className="auth-main-div">
      <div>
        <div>
          <p>Email</p>
          <input
            type="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.username}</p>
        </div>
        <div>
          <p>Password</p>
          <input
            type="text"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.password}</p>
        </div>
        <button onClick={formik.handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
