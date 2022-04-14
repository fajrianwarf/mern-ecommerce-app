import React, { useEffect, useState } from 'react'

export default function Tags ( {dataTags, setSendTag} ) {
  const [tags, setTags] = useState([])

  const toggleTag = (tag) => {
    try {
      let newData = dataTags;
      
      if(dataTags.find( item => item._id === tag._id )) {
        const status = tags.filter( item => item._id === tag._id)
        
        if(status.length === 0){
          newData = [ ...tags, tag ]
        } else {
          newData = tags.filter( item => item._id !== tag._id) 
        }

      } else {
        newData = [ ...tags ]
      }

      setTags(newData)
      
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setSendTag(tags);
  }, [tags])

  return (
    <div className='flex flex-wrap items-center justify-center w-2/5 gap-2 mx-auto'>
      {dataTags.map((tag) => (
        <button key={tag._id} className={`${tags.find(item => item._id === tag._id) ? 'bg-green-400': 'bg-white'} hover:ring hover:ring-sky-100 shadow-sm px-3 py-0.5 rounded-md`} onClick={() => toggleTag(tag)}>
          {tag.name}
        </button>
      ))}
    </div>
  )
}
