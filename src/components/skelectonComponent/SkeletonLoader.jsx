import React from "react";
import Skeleton from "react-loading-skeleton";

const HomePinSkeletonLoader = () => {
  return (
    <>

   <div className="animate-pulse bg-slate-400 border border-blue-200 shadow rounded-md p-4 max-w-lg w-full h-[15%] md:h-[40%] lg:h-[60%] my-5">
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</div>
{/* <div className="shadow rounded-md px-[1rem] py-[
  1rem] lg:px-1 lg:py-1 max-w-lg w-full h-[4%] lg:h-[8%] mt-1 mb-1 mr-3 ml-3">
<div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-200 w-2.5 h-2.5 md:w-4 md:h-4 lg:w-4 lg:h-4 "></div>
    <div className="flex-1 space-y-6 py-1">
      <div className=" h-1 lg:h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
</div> */}
   </>
  );
};

export default HomePinSkeletonLoader;
