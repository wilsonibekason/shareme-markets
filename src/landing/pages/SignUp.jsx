import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import {Formik, useField, Form} from 'formik';
import * as Yup from 'yup';

import { OnRegisterContext } from "../../context/onRegisterContext";

import Header from "../partials/Header";
import { client } from "../../client";


// defining dynamic styles for login validations and error handling on bad user authentication  and authorization 
function SignUp() {
 
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const navigate = useNavigate();


//////// userefy called when application .


  const responseGoogle = (response) => {


    console.log(response);
    console.log("====================================");
    console.log(response?.error);
    console.log("====================================");
    localStorage.setItem("user", JSON.stringify(response?.profileObj));
    const { name, googleId, imageUrl } = response?.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/signin", { replace: true });
    });
  }
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}''
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="text-lg lg:text-lg font-bold">
                  This is your first step to unlimited experiences
                </h1>
              </div>

              
                
                  
              {/* Form */}
              <div className="max-w-sm mx-auto">


              <Formik
                  initialValues={{
                    user: "",
                    password:"",
                    email: '',
                    acceptedTerms: false, // added for our checkbox
                    jobType: '', // added for our select
                   }}
                   validationSchema={Yup.object({
                    user: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
         
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          pwd: Yup.string().required('Password is required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          jobType: Yup.string()
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            .required('Required'),
                   })}
                   validate={values => {

                    const errors = {};
                  
                    if (!values.email) {
                  
                      errors.email = 'Required';
                  
                    } else if (
                  
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  
                    ) {
                  
                      errors.email = 'Invalid email address';
                  
                    } else if(
                      !USER_REGEX.test(values.user)
                    ) {
                      errors.user = "Name length must be at least 8";
                    }
                     else if(
                      !PWD_REGEX.test(values.password)
                    ) {
                      errors.password = "Must include uppercase and lowercase letters, a number and a special character";
                    }
                  
                    return errors;
                  
                  }}

                   onSubmit={  (values, {setSubmitting}) => {
              
                    try {
                      
                    } catch (error) {
                      
                    }
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}

                   >
                   {({
                  values,

                  errors,
                
                  touched,
                
                  handleChange,
                
                  handleBlur,
                
                  handleSubmit,
                
                  isSubmitting,
                   }) => (
                    <>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-[14px] md:text-[17px] lg:text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="user"
                        type="text"
                        name="user"                                    onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user}
                        className={`${errors.user && touched.user && errors.user ? "border-rose-900" : ""}form-input w-full text-gray-800 rounded-full placeholder:text-[14px] md:placeholder:text-[17px] lg:placeholder:text-sm  placeholder:text-center px-1 py-2 lg:px-4 lg:py-3 ` }
                        placeholder="Enter your full name"
                        required
                      /> 
                          {errors.user && touched.user && errors.user}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-[14px] md:text-[17px] lg:text-smfont-medium mb-1"
                        htmlFor="email"
                      >
                        Email <span className="text-red-600 ">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"                                    onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="form-input w-full text-gray-800 rounded-full placeholder:text-[14px] md:placeholder:text-[17px] lg:placeholder:text-sm  placeholder:text-center px-1 py-2 lg:px-4 lg:py-3"
                        placeholder="Enter your email address"
                        required
                      /> 
                          {errors.email && touched.email && errors.email}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-[14px] md:text-[17px] lg:text-sm font-medium mb-1 "
                        htmlFor="password"
                      >
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"               
                        onChange={handleChange}                 
                        onBlur={handleBlur}                  
                        value={values.password}
                        className="form-input w-full text-gray-800 rounded-full placeholder:text-[14px] md:placeholder:text-[17px] lg:placeholder:text-sm  placeholder:text-center px-1 py-2 lg:px-4 lg:py-3 "
                        placeholder="Enter your password"
                        required
                      />
                      {errors.password && touched.password && errors.password}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full text-[14px] md:text-[17px] lg:text-sm rounded-full" disabled={isSubmitting}>
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="text-[.65rem] lg:text-sm  text-gray-500 text-center mt-3">
                    By creating an account, you agree to the{" "}
                    <a className="underline" href="#0">
                      terms & conditions
                    </a>
                    , and our{" "}
                    <a className="underline text-[.65rem] lg:text-sm  " href="#0">
                      privacy policy
                    </a>
                    .
                  </div>
                </form>
                </>
                     )}
                 </Formik>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic text-sm">Or</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form>
              
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <GoogleLogin
                        //  clientId={`${process.env.WEB2_CLOUD_PUBLIC_API}`}
                        clientId="843975118254-pqumnmmant7vg9d1o4qgv7boc3bfth3g.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <button
                            className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center rounded-full" 
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          >
                            <svg
                              className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                            </svg>
                            <span className="flex-auto pl-16 pr-8 -ml-16 text-[.7rem] lg:text-sm">
                              Continue with Google
                            </span>
                          </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy="single_host_origin"
                      />
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6 text-[14px] md:text-[17px] lg:text-sm ">
                  Already using Shareme?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
