import axios from 'axios'
import { api } from '../helper'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
// import Checkbox from '../components/Checkbox'

export default function Register() {
  const navigate = useNavigate()
  const [ full_name, setFullName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')
  const [ validation, setValidation ] = useState('');

  let body = { full_name, email, password }

  const register = async (e) => {
    e.preventDefault()
    try {
      if(password === password2){
        await axios
          .post(`${api}/auth/register`, body)
          .then(res => {
            setValidation(res.data)
            if(res.data.error !== 1) {
              setTimeout(() => {
                navigate('/login');
              }, 500);
            }
            
          })
      }
      
    } catch (err) {
        console.log(err)
    }
  }

  return (
      <Container className='w-2/5'>
        <form>
            <div className='flex items-center justify-between mb-4'>
              <h1 className='text-2xl font-medium text-gray-800 uppercase justify-self-center'>Register</h1>
              <Link to='/' className='px-2 py-1 mr-1 text-white rounded-md bg-sky-500 justify-self-end'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <Input name='full_name' label='Full name' placeholder='John Doe' onChange={e => setFullName(e.target.value)} />
            {validation.fields?.full_name ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.full_name.message}</p>) : ''}
            <Input type='email' name='email' label='Email' placeholder='johndoe@example.com' onChange={e => setEmail(e.target.value)} />
            {validation.fields?.email ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.email.message}</p>) : ''}
            <Input type='password' name='password' label='Password' placeholder='...' onChange={e => setPassword(e.target.value)} />
            {validation.fields?.password ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.password.message}</p>) : ''}
            <Input type='password' name='confirm_password' label='Confirm Password' placeholder='...' onChange={e => setPassword2(e.target.value)} />
            {password !== password2 ? (<p className='mb-2 -mt-2 text-sm text-red-400'>Password is not the same</p>) : ''}
            {/* <div className='flex justify-between mt-1 text-gray-500'>
                <Checkbox name='remember'>Accept terms and conditions</Checkbox>
                <div>
                  <span>Already have an account? </span><Link to='/login' className='text-sky-600'>login</Link>
                </div>
            </div> */}
            <Button onClick={(e) => register(e)} >sign up</Button>
        </form>
      </Container>
  )
}
