import React from 'react';
import Skeleton from 'react-loading-skeleton';

const  HomePinSkeletonLoader = () => {
    return(
        <section>
            <h2>
                <Skeleton duration={1} height={30} width={300}/>
            </h2>
            <ul>
                {Array(9).fill().map((item, index) => (
                    <li key={index}>
                        <Skeleton height={180} />
                        <h4>
                            <Skeleton circle={true}  height={50} width={50}/> &nbsp;
                            <Skeleton height={36} width={'80%'} />
                        </h4>
                            <p>
                                <Skeleton width={'60%'} />
                            </p>
                            <div>
                                <Skeleton width={'90%'} />
                            </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default HomePinSkeletonLoader;