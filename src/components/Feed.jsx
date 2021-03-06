import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";
//import UploaderSpinner from "./uploadLoader/UploaderSpinner";
import MasonaryLayout from "./MasonaryLayout";
import { feedQuery, searchQuery } from "../utils/data";
import { HomePinSkeletonLoader, MasonarySkelectonLoader } from "./skelectonComponent";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);

      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        const timer = setTimeout(() => {
          setPins(data);
        }, 5000);
        // cancle the timer while unmounting
        setLoading(false);
        return () => clearTimeout(timer);
      });
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        const timer = setTimeout(() => {
          setPins(data);
        }, 5000);
        // cancle the timer while unmounting
        setLoading(false);
        return () => clearTimeout(timer);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || "NEW";
  if (loading) return <Spinner />;
  if (!pins?.length)
    return <h1 className="mt-10 text-center text-xl "><MasonarySkelectonLoader/></h1>;
  return <div>{pins && <MasonaryLayout pins={pins} />}</div>;
};

export default Feed;
