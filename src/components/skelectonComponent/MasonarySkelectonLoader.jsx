import React from 'react'
import Masonry from 'react-masonry-css';
import HomePinSkeletonLoader from './SkeletonLoader';
import {v4 as uuid} from 'uuid'

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
 let COUNTER = 12;
const MasonarySkelectonLoader = () => {
    let pinsLoaded = Array(COUNTER).fill(<HomePinSkeletonLoader className="" key={uuid} />)
  return (
    <Masonry 
     className='flex animate-slide-fwd space-x-5'
     breakpointCols={breakpointColumnsObj}
    >
{pinsLoaded}
    </Masonry>
  )
}

export default MasonarySkelectonLoader