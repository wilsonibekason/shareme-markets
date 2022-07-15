import React from 'react'
import Masonry from 'react-masonry-css';
import HomePinSkeletonLoader from './SkeletonLoader';

// creating breakpoints limiits
const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 2,
    300: 1,
  };
 // loader number
 let COUNTER = 20;
const MasonarySkelectonLoader = () => {
    let pinsLoaded = Array(COUNTER).fill(<HomePinSkeletonLoader className="w-max"/>)
  return (
    <Masonry 
     className='flex animate-slide-fwd'
     breakpointCols={breakpointColumnsObj}
    >
{pinsLoaded}
    </Masonry>
  )
}

export default MasonarySkelectonLoader