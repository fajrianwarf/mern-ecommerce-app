import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Listbox } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../helper'
 
const addressInit = [{name: 'select one: '}]

export default function Carts() {
  const navigate = useNavigate();
  const [ user, setUser ] = useState([]);
  const [ carts, setCarts ] = useState([]);
  const [ addressData, setAddressData ] = useState([]);
  const [ selectedAddress, setSelectedAddress ] = useState(addressInit[0])
  const [ validation, setValidation ] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token')); //the token needs to get renewed whenever the page renders or else the token will get the value previous token after login (and to get the newly login token you would even need to refresh the page)

  const authHeaders = {headers: {Authorization : `Bearer ${token}`}}
 
  const checkAuth = async () => {
      try {
          await axios
              .get(`${api}/auth/me`, authHeaders)
              .then(res => {
                  console.log(res.data, 'check auth from carts')
                  if(res.data.error !== 1){
                      setUser(res.data)
                  } 

              })
      } catch (err) {
          console.log(err, 'error check auth')
      }
  }

  const getAddress = async () => {
      try {
          await axios
              .get(`${api}/api/delivery-addresses`, authHeaders)
              .then( res => setAddressData(res.data.data))

      } catch (err) {
          console.log(err)
      }
  }
  
  const getCart =  async () => {
      try {
          await axios
              .get(`${api}/api/carts`, authHeaders)
              .then( res => setCarts(res.data))
              
      } catch (err) {
          console.log(err, 'cant get the carts data')
      }
  }

  const minQty = async (cart) => {
    try {
      let body = [];
      if(carts.find( (item, index) => item[index] === cart[index] )) {
        body = carts.map( item => ({...item, qty: item.product.name === cart.name && item.qty !== 0 ? item.qty - 1 : item.qty}));
      } else {
        body = [ ...carts ]
      }
      
      setCarts(body);
      await axios.put(`${api}/api/carts`, { items: body }, authHeaders) // sending the data everytime the button is clicked
        
    } catch (err) {
      console.log(err)
    }
  }

  const plusQty = async (cart) => {
    try {
      let body = [];
      
      if(carts.find( (item, index) => item[index] === cart[index] )) {
        body = carts.map( item => ({...item, qty: item.product.name === cart.name ? item.qty + 1 : item.qty}));
      } else {
        body = [ ...carts ]
      }
      
      setCarts(body);
      await axios
        .put(`${api}/api/carts`, { items: body }, authHeaders)

    } catch (err) {
      console.log(err)
    }
  }

  const deleteCart = async (cart) => {
    try {
      let body = [];
      if(carts.find( (item, index) => item[index] === cart[index] )) {
        body = carts.filter( item => item.name !== cart.name)
      } else {
        body = [ ...carts ]
      }
      
      setCarts(body);
      await axios.put(`${api}/api/carts`, { items: body }, authHeaders) // sending the data everytime the button si clicked
        
    } catch (err) {
      console.log(err)
    }
  }

  const checkOut = async () => {
    try {
      let body = { user: user, delivery_fee: 0, order_items: carts, delivery_address: selectedAddress } // synchronizing the format data equal to the model at the backend

      if(selectedAddress.name !== 'select one: '){
        await axios
          .post(`${api}/api/orders`, body, authHeaders)
          .then( res => {
            setValidation(res.data)
            if(res.data.error !== 1) {
                navigate(`/user/invoice/${res.data._id}`)
            }

          });
        }
        
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    getCart();
    getAddress();
    checkAuth();

  }, [])

  return (
    <div className='min-h-screen bg-sky-200'>
      <div className='container'>
        <div className='min-h-screen px-4 py-4 bg-sky-50'>
          {/* Carts title start */}
          <div className='flex items-center justify-between'>
            <div className='flex justify-center w-full pt-4 pb-2 text-2xl uppercase'>Your Carts</div>
            <Link to='/' className='px-2 py-1 text-white rounded-md bg-sky-500'>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          {/* Carts title start */}

          {/* Carts address body start */}
          <div className='px-4 py-4 my-2 bg-white rounded-md shadow-sm'>
            <div className='flex items-center justify-between mb-2 gap-x-4'>
              <div className='w-56'>Delivery fee</div>:
              <div className='flex-auto px-2 py-1 border rounded-md shadow-sm'>free, promo</div>
            </div>
            <div className='flex items-start justify-between gap-x-4'>
              <div className='w-56 py-1'>Choose shipping address</div>:
              <div className='flex-auto'>
                <Listbox value={selectedAddress} onChange={setSelectedAddress}>
                  <Listbox.Button className={`${selectedAddress.name === 'select one: ' ? 'bg-red-200' : 'bg-blue-200' } rounded-md border px-2 hover:font-semibold py-1 w-full shadow-sm justify-start hover:ring hover:ring-sky-200`}>
                    {selectedAddress.name}
                  </Listbox.Button>
                  <Listbox.Options className={'w-full mt-1 overflow-hidden bg-white border border-gray-200 rounded-md'}>
                    {addressData.map( address => (
                      <Listbox.Option key={address._id} value={address} className='px-2 py-0.5 cursor-pointer hover:bg-sky-200'>
                        {address.name}, {address.street}, {address.city} {address.postal_code}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </div>
            <div className='flex items-center justify-end mt-2 gap-x-2'>
                <div className='py-1'>or</div>
                <Link to='/user/address' className='flex justify-center px-2 py-1 bg-green-300 rounded-md shadow-sm w-44 hover:font-semibold hover:ring hover:ring-green-300 hover:bg-green-400' >Add New Address</Link>
            </div>
          </div>
          {/* Carts address end */}
          
          {/* Carts product start*/}
          <div className='flex flex-col gap-4 px-4 py-4 bg-white rounded-md shadow-sm'>
            {carts.length === 0 ? 
              (<div className='px-4 py-2 bg-red-200 rounded-md'>there is no product in here</div>)
               : 
              carts.map( cart => (
                  <div key={cart._id} className='flex flex-row items-center overflow-hidden border rounded-lg bg-sky-100'>
                    <div className='w-56 bg-white h-44'>
                      <img className='object-cover' src={`${api}/api/images/${cart.img_url}`} alt="product" />
                    </div>
                    <div className='w-full px-4'>
                      <div className='flex justify-end'>
                        <div className='w-full'>{cart.name}</div>
                        <button className='px-2 py-0.5 text-red-400 hover:text-red-700' onClick={() => deleteCart(cart)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div>{cart.product.description}</div>
                      <div>@ {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cart.price)}</div>
                      <div className='flex items-center justify-end gap-x-2'>
                        <button className='px-2 py-2 text-gray-700 bg-white rounded-md shadow-sm hover:bg-red-400' onClick={() => minQty(cart)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div>{cart.qty}</div>
                        <button className='px-2 py-2 text-gray-700 bg-white rounded-md shadow-sm hover:bg-green-400' onClick={() => plusQty(cart)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <div className='flex justify-end py-2 gap-x-2'>
                        <div>Price :</div>
                        <div className='flex justify-end px-2 bg-white rounded-sm w-36'>
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cart.price * cart.qty)}
                        </div>
                      </div>
                    </div>
                  </div>
              )
            )}
            <div className='flex justify-end gap-x-2'>
              <div className='flex flex-row items-center gap-x-2'>
                <div>Total price: </div>
                <div>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(carts.map( item => (item.qty * item.price)).reduce((preVal, currentVal) => preVal + currentVal, 0))}
                </div>
              </div>
              <button className='px-4 py-2 bg-green-300 rounded-md' onClick={() => checkOut()}>Check out</button>
            </div>
            <div className='flex justify-end -mt-3'>
              {selectedAddress.name === 'select one: ' ? (<p className='mb-2 text-red-400'>please select your shipping address first</p>) : ''}
              {validation.error === 1 ? (<p className='mb-2 text-red-400'>{validation.message}</p>) : ''}
            </div>
          </div>
          {/* Carts product end*/}
        </div>
      </div>
    </div>
  )
}
