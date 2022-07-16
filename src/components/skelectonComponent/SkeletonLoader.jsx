import React from "react";
import Skeleton from "react-loading-skeleton";

const HomePinSkeletonLoader = () => {
  return (
    <>

   <div class="border border-blue-300 shadow rounded-md p-4 max-w-lg w-full h-[80%] ">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-200 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-200 rounded col-span-2"></div>
          <div class="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</div>
<div class="shadow rounded-md px-2 py-1 max-w-lg w-full h-[8%] my-5 file:mr-3 ml-3">
<div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-200 h-6 w-6"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
</div>
   </>
  );
};

export default HomePinSkeletonLoader;
