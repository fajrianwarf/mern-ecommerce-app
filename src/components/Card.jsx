import React from 'react'

export default function Card() {
  return (
    <div>
        <div className='overflow-hidden border-2 border-blue-500 rounded-lg'>
            <img className='object-cover object-center w-full h-36' src={require('../images/broccoli.jpg')} alt="products" />
            <div className='px-3 pt-2 pb-4'>
                <h1>Title</h1>
                <h2>category</h2>
                <p>description</p>
                <p>logo tag</p>
                <p>price</p>
                <p>logo buy</p>
            </div>
        </div>
    </div>
  )
}
