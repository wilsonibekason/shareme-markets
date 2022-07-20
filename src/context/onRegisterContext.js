
import { useState, useContext, createContext, useEffect, useRef } from "react";

const Context = createContext();

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const OnRegisterContext = ({children}) => {
const userRef = useRef();
const errRef = useRef();

// defining registrstion states

       return(
        <Context.Provider value={''}>
           {children}
        </Context.Provider>
       )
}
