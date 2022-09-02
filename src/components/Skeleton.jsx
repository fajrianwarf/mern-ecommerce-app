import React from 'react';

const Skeleton = () => {
  return (
    <div className='overflow-hidden rounded-lg shadow-lg animate-pulse'>
      <div className='bg-gray-300 w-full h-36'></div>
      <div className='px-3 pt-2 pb-4'>
        <div className='bg-gray-300 rounded-md h-6 mb-2'></div>
        <div className='bg-gray-300 rounded-md h-8 mb-2'></div>
        <div className='my-2'>
          <div className='h-3 w-full bg-gray-300 mb-2'></div>
          <div className='h-3 w-full bg-gray-300 mb-2'></div>
          <div className='h-3 w-1/4 bg-gray-300 mb-2'></div>
        </div>
        <div className='flex gap-2 mt-4'>
          <div className='h-6 w-16 rounded-md bg-gray-300'></div>
          <div className='h-6 w-16 rounded-md bg-gray-300'></div>
          <div className='h-6 w-16 rounded-md bg-gray-300'></div>
        </div>
        <div className='my-2 flex items-center gap-x-2'>
          <div className='bg-gray-300 w-4 h-4'></div>
          <div className='bg-gray-300 w-20 h-4'></div>
          <span>/</span>
          <div className='bg-gray-300 w-4 h-4'></div>
        </div>
        {/* <div className='bg-gray-300 w-full rounded-md h-8 mt-4'></div> */}
      </div>
    </div>
  );
};

export default Skeleton;
