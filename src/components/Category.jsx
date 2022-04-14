import React, { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'

//A copied format from database for initial value
const categoryInit = [{name: 'Category:'}]

export default function Category( {dataCategories, setSendCategory} ) {
    
    const [selectedCategory, setSelectedCategory] = useState(categoryInit[0])

    useEffect(() => {
        setSendCategory(selectedCategory);
    }, [selectedCategory])

    return (
        <Listbox as='div' className='relative' value={selectedCategory} onChange={setSelectedCategory}>
            <Listbox.Button className='flex w-32 justify-between hover:ring hover:font-medium hover:ring-sky-300 gap-x-1 items-center pl-2 pr-1 py-0.5 text-white border shadow-sm border-gray-200 rounded-md'>
                {selectedCategory.name}
                { selectedCategory.name === categoryInit[0].name ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg> 
                    :
                    <div className='items-center w-5 h-5 -mt-3 text-lg hover:text-red-400' onClick={() => setSelectedCategory(categoryInit[0])}>x</div>
                }
            </Listbox.Button>
            <Listbox.Options className='absolute w-full mt-1 overflow-hidden bg-white border border-gray-200 rounded-md'>
                {dataCategories.map((category) => (
                    <Listbox.Option
                    key={category._id}
                    value={category}
                    className='px-2 py-1 cursor-pointer hover:bg-sky-100'
                    >
                    {category.name}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    )
}
