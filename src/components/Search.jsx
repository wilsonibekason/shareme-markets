import React, { useEffect, useState } from "react";
import { client } from "../client";
import { searchQuery, feedQuery } from "../utils/data";
import { useParams } from "react-router-dom";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const { searchId } = useParams();
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true);
      const query = searchQuery(searchTerm?.toLowerCase());
      client.fetch(query).then((data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);
  console.log(searchId);
  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonaryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found</div>
      )}
    </div>
  );
};

export default Search;
