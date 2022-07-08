import React, { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsHandThumbsUp } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineComment } from "react-icons/md";

const CommentPosted = ({ commented }) => {
  const [onComment, setOnComment] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center min-h-fscreen mt-10 overflow-auto">
        <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              {/* <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div> */}
              <img
                src={commented.postedBy?.image}
                className="w-7 h-7 rounded-full cursor-pointer"
                alt="user-profile"
              />
              <div className="text-lg font-bold text-slate-700">
                {commented.postedBy?.userName}
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                Reply
              </button>
              <div className="text-xs text-neutral-500">2 hours ago</div>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <div className="mb-3 text-xl font-bold">
              Nulla sed leo tempus, feugiat velit vel, rhoncus neque?
            </div>
            <div className="text-sm text-neutral-600">{commented.comment}</div>
          </div>

          <div>
            <div className="flex items-center justify-between text-slate-500">
              <div className="flex space-x-4 md:space-x-8">
                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                  <BiCommentDetail className="mr-1.5 h-4 w-4" />
                  <span>125</span>
                </div>
                <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                  <BsHandThumbsUp className="mr-1.5 h-4 w-4" />
                  <span>4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPosted;
