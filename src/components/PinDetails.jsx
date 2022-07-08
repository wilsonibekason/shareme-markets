/* eslint-disable react-hooks/exhaustive-deps */
//internal dependencies || 3rd party dependencies

import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
//import { AiFillHeart } from "react-icons/ai";
//import { BiHeart } from "react-icons/bi";

// external dependencies

import { client, urlFor } from "../client";
import MasonaryLayout from "./MasonaryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";
//import CommentPosted from "./CommentPosted";
import Modal from "./modal";

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // scrolltotop functionality

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client
            .fetch(query1)
            .then((res) => {
              setPins(res);
            })
            .catch((error) => {
              console.log("----------------------");
              console.log(error);
              console.log("-------------------------------");
            });
        }
      });
    }
  };
  console.log("====================================");
  console.log(pinId);
  console.log("====================================");
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <>
      {pinDetail && (
        <div
          className="flex xl:flex-row flex-col m-auto bg-white shadow-lg"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg h-auto max-w-full  align-middle"
              src={pinDetail?.image && urlFor(pinDetail?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {`${pinDetail.destination?.slice(0, 20)} ....`}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link
              to={`/user-profile/${pinDetail?.postedBy._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={pinDetail?.postedBy.image}
                className="w-5 h-5 lg:w-10 lg:h-10 md:w-8 md:h-8 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-[23px] text-center  sm:text-[5px] font-black">
              Comments
            </h2>
            <div className="max-h-370 overflow-y-tauto">
              {pinDetail?.comments?.map((item) => (
                <>
                  <div
                    className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                    key={item.comment}
                  >
                    <img
                      src={item.postedBy?.image}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      alt="user-profile"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{item.postedBy?.userName}</p>
                      <p>{item.comment}</p>
                    </div>
                    <div className="flex flex-end">
                      <button
                        type="button"
                        className="bg-red-500 text-white rounded-full px-2 py-1 font-semibold text-[0.8rem] outline-none"
                        onClick={addComment}
                      >
                        reply
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
            {/**<Modal />**/}
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user?._id}`}>
                <img
                  src={user?.image}
                  className="w-10 h-10 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              <input
                className=" flex-1 w-12 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className=" relative block">
                <input
                  type="text"
                  id="search-navbar"
                  className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>

              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-2 py-2 lg:px-4 lg:py-2  font-semibold text-[15px] outline-none"
                onClick={addComment}
              >
                {addingComment ? "Sending..." : "send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!pins?.length && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          Please their is no pin to recommend for you, consider adding category
          based pins to this one
        </h2>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonaryLayout pins={pins} onScroll={scrollToTop} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;
