import React from "react";
import Skeleton from "react-loading-skeleton";

const HomePinSkeletonLoader = () => {
  return (
    <section>
      <h2 className="mt-[30px]">
        <Skeleton duration={1} height={30} width={300} />
      </h2>
      <ul className="flex justify-between flex-wrap list-none p-0">
        {Array(9)
          .fill()
          .map((item, index) => (
            <li key={index} className="w-[calc(33%-10px)] mt-[30px]">
              <Skeleton height={180} />
              <h4 className="mt-[10px]">
                <Skeleton circle={true} height={50} width={50} /> &nbsp;
                <Skeleton height={36} width={"80%"} />
              </h4>
              <p className="mt-1 mb-1 font-bold text-base">
                <Skeleton width={"60%"} />
              </p>
              <div>
                <Skeleton width={"90%"} />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default HomePinSkeletonLoader;
