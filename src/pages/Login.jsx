import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Container from '../components/Container'
import Input from '../components/Input'

export default function Login() {
  return (
      <Container className='w-2/5'>
        <form>
            <div className='flex items-center justify-between mb-4'>
              <h1 className='text-2xl font-medium text-gray-800 uppercase justify-self-center'>Login</h1>
              <Link to='/' className='px-2 py-1 mr-1 text-white rounded-md bg-sky-500 justify-self-end'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <Input type='email' name='email' label='Email' placeholder='johndoe@example.com' />
            <Input type='password' name='password' label='Password' placeholder='...' />
            <div className='flex justify-between mt-1 text-gray-500'>
                <Checkbox name='remember'>remember me</Checkbox>
                <a href='#' onClick={(e)=> e.preventDefault()}>Forgot password ?</a>
            </div>
            <Button onClick={(e)=> e.preventDefault()} >sign in</Button>
        </form>
      </Container>
  )
}
