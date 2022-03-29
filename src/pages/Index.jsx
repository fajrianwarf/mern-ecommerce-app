import React from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom';

export default function Index() {
    const auth = {
        check: true,
        user: {
            role: 'admin',
            full_name: 'Fajrianwar Fachrul'
        }
    };

    // const preventDef = (e) => e.preventDefault;

  return (
    <div>
        <div className='bg-gradient-to-t from-sky-600 via-blue-500 to-sky-600'>
            <div className='py-4 border-b border-white/10'>
                <div className='container'>
                    <nav className='flex items-center justify-between'>
                        <div className='text-xl font-medium text-white'>
                            <Link to='/'>FakeCOPEE</Link>
                        </div>

                        <div className='flex items-center w-96 gap-x-2'>
                            <button className='text-lg text-white'>category</button>
                            <span className='text-white'>|</span>
                            <input type="text" className='py-0.5 w-full rounded-md' placeholder='search something' />
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Checking auth start */}
                        { auth.check ? (
                            <div className='flex items-center text-white gap-x-2'>
                                <a href="#" className={`${auth.user.role === 'admin' ? 'font-bold' : ''} flex items-center px-2 py-1 rounded-lg hover:bg-blue-700/40 gap-x-2`}>
                                    {`${auth.user.full_name}`} 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        ) : (
                            <div className='flex items-center text-white gap-x-2'>
                                <Link to="/login" className='px-2 py-1 rounded-lg hover:bg-blue-700/40 '>Sign In</Link>
                                <Link to="/signup" className='px-2 py-1 rounded-lg hover:bg-blue-700/40 '>Sign Up</Link>
                            </div>
                        ) }
                        {/* Checking auth end */}
                    </nav>
                </div>
            </div>
        </div>
        <div className='bg-sky-200 '>
            <div className='container'>
                <div className='bg-sky-50'>
                    <div className='w-1/3 py-2 mx-auto'>Tags: </div>
                    <hr className='mx-5 border-gray-300' />
                    <div className='grid grid-cols-5 gap-4 mx-6 my-4'>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                    <hr className='mx-5 border-gray-300' />
                    <div className='w-1/3 pt-2 pb-6 mx-auto'>Pages</div>
                </div>
            </div>
        </div>
    </div>
  )
}
