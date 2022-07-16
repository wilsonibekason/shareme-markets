import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Route, Routes, Link } from "react-router-dom";
import { Sidebar, UserProfile, SidebarMobile } from "../components";
import { client } from "../client";
import Logo from "../assets/logo.png";
import { userQuery } from "../utils/data";
import Pins from "./Pins";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-grey-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden sm:flex h-screen">
        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full h-auto flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={30}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="w-[5rem] lg:w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-5 lg:w-10 rounded-full" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="  fixed w-4/5 bg-white h-full overflow-y-auto shadow-md z-index-10 animate-slide-10">
            <div
              className="absolute w-full 
                      flex justify-end items-center p-2"
            >
              <AiFillCloseCircle
                fontSize={20}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route
            path="/user-profile/:userId"
            element={<UserProfile user={user && user} />}
          />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
