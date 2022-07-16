import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdAdd } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  console.log("====================================");
  console.log("user login info : ", user);
  console.log("user login info : ", user?._id);
  console.log("====================================");
  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex justify-start items-center w-full px-2 rounded-[2rem] bg-white focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            className="p-[.2rem] lg:p-2 w-full bg-white outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user.image}
              alt="user-pic"
              className="w-12 h-12 rounded-lg"
            />
          </Link>
          <Link
            to="/create-pin"
            className="bg-white text-black rounded-full w-7 h-7 lg:w-12 lg:h-12 md:w-14 md:h-12 flex justify-center items-center shadow-lg"
          >
            <IoMdAdd fontSize={25} />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
