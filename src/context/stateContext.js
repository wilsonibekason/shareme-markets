import { createContext, useContext, useEffect, useState } from "react";
const Context = useContext();
export const StateContext = ({ children }) => {
  

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
