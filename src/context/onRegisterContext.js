
import { useState, useContext, createContext, useEffect, useRef } from "react";

const Context = createContext();

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const OnRegisterContext = ({children}) => {
const userRef = useRef();
const errRef = useRef();

// defining registrstion states
const [user, setUser] = useState('');
const [validName, setValidName] = useState(false);
const [userFocus, setUserFocus] = useState(false);

const [pwd, setPwd] = useState('');
const [validPwd, setValidPwd] = useState(false);
const [pwdFocus, setpwdFocu] = useState(false);

const [matchPwd, setMatchPwd] = useState('');
const [validMatch, setValidMatch] = useState(false);
const [matchFocus, setMatchFocus] = useState(false);

const [errMsg, setErrMsg] = useState('');
const [success, setSuccess] = useState(false);


useEffect(() => {
   userRef.current.focus();
});

useEffect(() => {
   setValidName(USER_REGEX.test(user));
}, [user]);

useEffect(() =>{
   setValidPwd(PWD_REGEX.test(pwd));
   setValidMatch(pwd === matchPwd);

}, [pwd, matchPwd])
       return(
        <Context.Provider value={''}>
           {children}
        </Context.Provider>
       )
}
