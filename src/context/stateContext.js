import { createContext, useContext, useEffect, useState } from "react";

export const StateContext = ({ children }) => {
  const Context = useContext();

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
