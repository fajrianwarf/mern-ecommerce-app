import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import { api } from '../helper'

export default function Address() {
    const navigate = useNavigate();
    const [ user, setUser ] = useState([])
    const [ name, setName ] = useState('');
    const [ street, setStreet ] = useState('');
    const [ province, setProvince ] = useState('');
    const [ city, setCity ] = useState('');
    const [ district, setDistrict ] = useState('');
    const [ postalCode, setPostalCode ] = useState('');
    const [ addressNote, setAddressNote ] = useState('');
    const [ validation, setValidation ] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token')); //the token needs to get renewed whenever the page renders or else the token will get the value previous token after login (and to get the newly login token you would even need to refresh the page)

    const authHeaders = {headers: {Authorization : `Bearer ${token}`}}
   
    const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }
    
    const getUser = async () => {
        try {
            await axios
                .get(`${api}/auth/me`, authHeaders)
                .then( res => {
                    if(res.data.error !== 1){
                        setUser(res.data);
                    }
                })
        } catch (err) {
            console.log(err, 'cant get user')
        }
    }

    
    const submitAddress = async (e) => {
        e.preventDefault()
        try {
            let body = { name, street,  district, province, city, postal_code: postalCode, address_note: addressNote, user } // synchronizing the format data equal to the model at the backend
            await axios
                .post(`${api}/api/delivery-addresses`, body, authHeaders)
                .then( res => {
                    setValidation(res.data);
                    if(res.data.error !== 1) {
                        navigate(-1);
                    }
                })
                
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    
  return (
    <Container className='w-2/5'>
        <form>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-2xl font-medium text-gray-800 uppercase justify-self-center'>Add Address</h1>
                <button onClick={(e) => goBack(e)} className='px-2 py-1 mr-1 text-white rounded-md bg-sky-500 justify-self-end'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <Input name='Name' label='Name' placeholder='my Home' value={name} onChange={(e) => setName(e.target.value)} />
                {validation.error === 1 && validation.fields.name !== undefined ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.name.message}</p>) : ''}
            <Input name='Street' label='Street' placeholder='Soekarno-Hatta Street' value={street} onChange={(e) => setStreet(e.target.value)}/>
                {validation.error === 1 && validation.fields.street !== undefined ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.street.message}</p>) : ''}
            <Input name='Province' label='Province' placeholder='Central Java' value={province} onChange={(e) => setProvince(e.target.value)} />
                {validation.error === 1 && validation.fields.province !== undefined ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.province.message}</p>) : ''}
            <div className='flex justify-between'>
                <Input name='City' label='City' placeholder='Semarang' value={city} onChange={(e) => setCity(e.target.value)} />
                    {validation.error === 1 && validation.fields.city !== undefined ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.city.message}</p>) : ''}
                <Input className={'w-72'} name='District' label='District' placeholder='Pedurungan' value={district} onChange={(e) => setDistrict(e.target.value)} />
                    {validation.error === 1 && validation.fields.district !== undefined ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.district.message}</p>) : ''}
            </div>
            <Input name='PostalCode' label='Postal Code' placeholder='50196' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                {validation.error === 1 && validation.fields.postal_code !== undefined ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.postal_code.message}</p>) : ''}
            <Input name='AddresNote' label='Addres Note' placeholder='green colored 2 stories building' value={addressNote} onChange={(e) => setAddressNote(e.target.value)} />
                {validation.error === 1 && validation.fields.address_note !== undefined ? (<p className='mb-2 -mt-2 text-sm text-red-400'>{validation.fields.address_note.message}</p>) : ''}
            <Button onClick={e => submitAddress(e)}>add</Button>
        </form>
    </Container>
  )
}
