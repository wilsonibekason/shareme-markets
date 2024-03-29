import React from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { client } from "../../client";

import Header from "../partials/Header";

function SignIn() {
  const navigate = useNavigate();
  // login  logic
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
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="text-lg lg:text-lg font-bold">
                  Start your journey by logging into Shareme.
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-[14px] md:text-[17px] lg:text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800 rounded-full px-1 py-2 lg:px-4 lg:py-3 placeholder:text-[14px] md:placeholder:text-[17px] lg:placeholder:text-sm  placeholder:text-center"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-[14px] md:text-[17px] lg:text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <Link
                          to="reset-password"
                          className="text-[.65rem] lg:text-sm font-medium text-blue-600 hover:underline"
                        >
                          Having trouble signing in?
                        </Link>
                      </div>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800 rounded-full px-1 py-2 lg:px-4 lg:py-3 placeholder:text-[14px] md:placeholder:text-[17px] lg:placeholder:text-sm  placeholder:text-center"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2 text-[14px] md:text-[17px] lg:text-sm">
                            Keep me signed in
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full rounded-full px-1 py-2 lg:px-4 lg:py-3 text-[14px] md:text-[17px] lg:text-sm  text-center">
                        Sign in 
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Or</div>
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
                <div className="text-gray-600 text-center mt-6 text-[14px] md:text-[17px] lg:text-sm">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign up
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

export default SignIn;
