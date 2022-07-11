import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { client, urlFor } from "../client";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";

const Pin = ({ pin, onScroll }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { postedBy, _id, image, destination } = pin;

  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  // deleting a pin
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  // console.log("====================================");
  // console.log(postedBy);
  // console.log(postedBy?._id);
  // console.log("====================================");

  console.log("====================================");
  console.log(postedBy);
  console.log(postedBy?._id);
  console.log("====================================");

  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4,
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(true);
        });
    }
  };
  const userProfileName = postedBy?.userName;
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => {
          navigate(`/pin-detail/${_id}`);
          //onScroll();
        }}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out "
      >
        {image && (
          <img
            className="rounded-lg w-full"
            src={urlFor(image).width(250).url()}
            alt="post_url"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2 pt-2 z-50 "
            style={{
              height: "100%",
              background:
                "linear-gradient(rgba(135, 80, 156, 0.3), rgba(135, 80, 156, 0.3)) ",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {`${pin?.save?.length}  `} saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-sm rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    savePin(_id);
                  }}
                >
                  {pin?.save?.length}
                  {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>

            <div className="flex justify-between items-center w-full  gap-2">
              {destination?.slice(0, 7).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {"  "}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(0, 6)}...
                </a>
              ) : (
                "NO PATH"
              )}
              {postedBy?._id === user?.googleId && (
                <button
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deletePin(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button> 
              )}
            </div>
          </div>
        )}
      </div>
      {/** User image to link back to profile edit page */}

      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <p className="font-samibold capotalize text-sm ">{postedBy?.title}</p>
        <img
          src={postedBy?.image}
          alt="postedBy_image"
          className="w-5 h-5  rounded-full object-cover"
        />
        <p className="font-semibold capitalize text-sm sm:inline">
          {userProfileName?.length > 18
            ? userProfileName.slice(0, 17) + "..."
            : userProfileName}
        </p>
      </Link>
    </div>
  );
};

export default Pin;
