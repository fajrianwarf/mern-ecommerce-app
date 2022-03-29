import React from 'react'

export default function Input( { label, type ='text', name , ...props } ) {
  return (
      <div>
        <label htmlFor={name} className='block mb-2 text-sm font-medium'>{label}</label>
        <input 
            name={name}
            id={name}
            type={type}
            {...props}
            className='w-full mb-2 transition duration-300 border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-100 focus:border-blue-400' 
        />
      </div>
  )
}
