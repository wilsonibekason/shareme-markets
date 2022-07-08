import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Search, Feed, PinDetails, Navbar, CreatePin } from "../components";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-grey-700">
        <Navbar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          user={user && user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetails user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="/search"
            element={
              <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
