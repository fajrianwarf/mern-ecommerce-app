import React from 'react'
import { api } from '../helper'

export default function Card( {dataProduct, dataUser, onClick} ) {
  return (
    <div className='overflow-hidden border-2 border-blue-500 rounded-lg shadow-lg'>
        <img className='object-cover object-center w-full h-36' src={`${api}/api/images/${dataProduct.img_url}`} alt="products" />
        <div className='px-3 pt-2 pb-4'>
            <h1 className='pb-2'>{dataProduct.name}</h1>
            <h2 className='px-2 py-1 bg-green-300 rounded-md'>{dataProduct.category.name}</h2>
            <div className='h-20 py-1'>{dataProduct.description}</div>
            <div className='flex flex-wrap gap-2'>
              {dataProduct.tags.map( tag => (
                <p key={tag._id} className='px-2 text-gray-800 rounded-md bg-sky-300'>{tag.name}</p>
              ))}
            </div>
            <p className='py-2'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dataProduct.price)} {dataProduct.category.name === 'Vegetable' ? '/ kg' : '/ pcs'  }</p>
            { !!dataUser.full_name ? 
              <button className='bg-sky-500 hover:ring hover:ring-sky-600 hover:text-gray-100 hover:bg-sky-400 py-0.5 text-white px-2 rounded-md' onClick={onClick}>Buy</button> 
              : '' 
            }
        </div>
    </div>
  )
}
