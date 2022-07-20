
import { useState, useContext, createContext, useEffect, useRef } from "react";

const Context = createContext();

const OnRegisterContext = ({children}) => {
       return(
        <Context.Provider value={''}>
           {children}
        </Context.Provider>
       )
}
