import React from 'react'

export default function Checkbox({ children, name, ...props}) {
  return (
      <div className='flex items-center gap-x-2'>
        <input 
            type="checkbox"
            className='text-blue-500 border-gray-300 rounded focus:ring-0'
            id={name}
            {...props}
        />
        <label htmlFor={name} className='select-none'>{children}</label>
      </div>
  )
}
