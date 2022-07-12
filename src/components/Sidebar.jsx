import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../assets/logo.png";

import { categories } from "../utils/data";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-grey-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrebold border-r-2 border-black hover:text-black transition-all duration-200 ease-in-out capitalize";
const unIdentified = " hide-scrollbar";

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between h-full bg-white overflow-y-scroll min-w-210">
      <div className="flex flex-col">
        <Link
          to="/"
          className="px-5 flex gap-2 my-6 pt-1 w-190 items-center "
          onClick={handleCloseSidebar}
        >
          <img src={Logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            {" "}
            disp ailo
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`category/${category.name}`}
              onClick={handleCloseSidebar}
              key={category.name}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <img
                src={category.image}
                className="w-10 h-10 rounded-full shadow-sm"
                alt="categoryimage"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 g-2 items-center bg-white rounded-lg shadow-lg p-3 mx-3' "
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            alt="urlImage"
            className="w-10 h-10 rounded-full "
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
