import React from "react";
import Skeleton from "react-loading-skeleton";

const HomePinSkeletonLoader = () => {
  return (
    <>

   <div className="border border-blue-200 shadow rounded-md p-4 max-w-lg w-full h-[15%] md:h-[40%] lg:h-[80%] ">
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
<div className="shadow rounded-md px-2 py-1 max-w-lg w-full h-[4%] lg:h-[8%] my-5 file:mr-3 ml-3">
<div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-200 h-6 w-6"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
</div>
   </>
  );
};

export default HomePinSkeletonLoader;
