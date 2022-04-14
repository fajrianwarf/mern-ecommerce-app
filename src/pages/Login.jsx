import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import { api } from '../helper'
// import Checkbox from '../components/Checkbox'

export default function Login() {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ validation, setValidation ] = useState([]);

  async function submitHandle(e) {
    e.preventDefault()
    
    try {
      let body = { email, password };
      await axios
        .post(`${api}/auth/login`, body)
        .then(res => {
          setValidation(res.data)
          localStorage.setItem('token', res.data.token)
          
          if(res.data.error !== 1){
            navigate('/')
          } else {
            localStorage.removeItem('token');
          }
        })
        
    } catch (err) {
      console.log(err)
    }
    
  }

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
            <Input type='email' name='email' label='Email' placeholder='johndoe@example.com' onChange={e => setEmail(e.target.value)} />
            {validation.error === 1 ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.message}</p>) : ''}
            <Input type='password' name='password' label='Password' placeholder='...' onChange={e => setPassword(e.target.value)} />
            {validation.error === 1 ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.message}</p>) : ''}
            {/* <div className='flex justify-between mt-1 text-gray-500'>
                <Checkbox name='remember' onClick={() => alert('yeah... i\'ll remember you, maybeeee !!')}>remember me</Checkbox>
                <button onClick={()=> alert('Please contact the admin, or you can register a new account')}>Forgot password ?</button>
            </div> */}
            <Button onClick={submitHandle} >sign in</Button>
        </form>
      </Container>
  )
}
