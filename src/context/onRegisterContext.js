
import { useState, useContext, createContext, useEffect, useRef } from "react";
import axios from '../../api/baseApi';
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

}, [pwd, matchPwd]);

// / creating the handle submit form
const handleSubmit = async (e) => {
e.preventDefault();
/// if buttton is enabled with JS hack
const v1 = USER_REGEX.test(user);
const v2 = PWD_REGEX.test(pwd);

/// comparing
if(!v1 || !v2){
   setErrMsg("invalid entry");
   return;
}
try {
   const response = await axios.post(REGISTER_URL, JSON.stringify({user, pwd}),
   {
      headers: {"Content-Type" : 'application/json'},
      withCredentials: true
   });
   console.log(response?.data);
   console.log(response?.accessToken);
   console.log(JSON.stringify(response));
   setSuccess(true);

   // clear state and uncontrolled inputs
   setPwd("");
   setUser("");
   setMatchPwd("");
} catch (error) {
   if(!error?.response){
     setErrMsg("No server response");
   } else if(error?.response?.status === 409){
      setErrMsg("username has already been registered");
   } else if(error?.response?.status === 400){
      setErrMsg("Missing user or password");
   } else if (error?.response?.status === 401){
      setErrMsg("Unauthorized");
   } else{
      setErrMsg("registration failed with status 500")
   }
   errRef.current.focus();
}
}
       return(
        <Context.Provider value={}>
           {children}
        </Context.Provider>
       )
}
