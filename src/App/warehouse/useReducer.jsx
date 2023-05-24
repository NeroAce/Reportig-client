import React from "react";
import reducer from "./reducer";
import { useReducer } from "react";

const initialstate = {
  name: "",
  position: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, disptch] = useReducer(reducer, initialstate);

  const userDetail = () => {
    return disptch({
      type: "USER_DETAIL",
      payload: {
        name: "Neelansh",
        position: "Writer",
      },
    });
  };

  return (
    <AppContext.Provider value={{ ...state, userDetail }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
