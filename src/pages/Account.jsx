import { Tab } from '@headlessui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../helper'

export default function Account() {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState([])
  const [orders, setOrders] = useState([])
  const [address, setAddress] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token')); //the token needs to get renewed whenever the page renders or else the token will get the value previous token after login (and to get the newly login token you would even need to refresh the page)

  const authHeaders = {headers: {Authorization : `Bearer ${token}`}}

  const getUserData = async () => {
      try {
          await axios
              .get(`${api}/auth/me`, authHeaders)
              .then(res => {
                  if(res.data.error !== 1){
                      setUserDetail(res.data)
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
              .then( res => setAddress(res.data.data))
              
      } catch (err) {
          console.log(err)
      }
  }

  const getOrders = async () => {
    try {
      await axios
        .get(`${api}/api/orders`, authHeaders)
        .then( res => setOrders(res.data))

    } catch (err) {
      console.log(err)
    }
  }

  const logout = async () => {
    try {
        await axios
            .post(`${api}/auth/logout`, null, authHeaders) // the body must be null, if not that would be an error at the backend
            .then(res => {
                if(res.data.error !== 1) {
                    localStorage.removeItem('token');
                    setUserDetail([]);
                    navigate('/');
                }
            })
        
    } catch (err) {
        console.log(err, 'can\'t logout')
    }
}

  useEffect(() => {
    getUserData();
    getOrders();
    getAddress();
  }, [])
  
  return (
    <div className='min-h-screen bg-sky-200'>
      <div className='container'>
        <div className='min-h-screen px-4 py-4 bg-sky-50'>
          <div className='flex items-center justify-between'>
            <div className='flex justify-center w-full pt-4 pb-2 text-2xl uppercase'>Your Account</div>
            <Link to='/' className='px-2 py-1 text-white rounded-md bg-sky-500'>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className='px-6 py-4 my-2 bg-white rounded-md shadow-sm'>
            <div>Account</div>
            <div className='flex items-center justify-between gap-x-4'>
              <div className='flex items-center flex-1 py-2 gap-x-4'>
                <div className=''>Name</div>:
                <div className='flex-1 px-2 py-1 border rounded-md shadow-sm'>{userDetail.full_name}</div>
              </div>
              <div className='flex items-center flex-1 py-2 gap-x-4'>
                <div className=''>Email</div>:
                <div className='flex-1 px-2 py-1 border rounded-md shadow-sm'>{userDetail.email}</div>
              </div>
            </div>
            <div className='flex justify-end'>
              <button onClick={() => logout()} className='px-2 py-1 bg-red-300 rounded-md shadow-sm'>Logout</button>
            </div>
          </div>
          <div className='px-6 py-4 my-2 bg-white rounded-md shadow-sm'>
            <Tab.Group>
              <Tab.List as='div' className={'flex gap-x-2 w-full justify-center mx-auto mb-2'}>
                <Tab className={'px-2 py-1 bg-sky-300 rounded-md'}>Ordered items</Tab>
                <Tab className={'px-2 py-1 bg-sky-300 rounded-md'}>Delivery Addresses</Tab>
              </Tab.List>
              <Tab.Panels>
                {/* Account section */}
                <Tab.Panel className={'bg-sky-50 border-blue-500 border-2 overflow-hidden rounded-md'}>
                  <div className='mx-4 my-4 text-xl font-semibold text-center text-gray-600 uppercase'>Ordered Items</div>
                  <div className="relative mx-4 my-4 overflow-x-auto rounded-lg shadow-md">
                    <table className="w-full text-sm text-center text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-sky-300">
                          <tr>
                              <th scope="col" className="w-10 py-3 pl-6 pr-2 text-left">
                              ID
                              </th>
                              <th scope="col" className="px-6 py-3 text-left">
                              Items
                              </th>
                              <th scope="col" className="px-6 py-3">
                              Total
                              </th>
                              <th scope="col" className="px-6 py-3">
                              Status
                              </th>
                              <th scope="col" className="px-6 py-3">
                              Invoice
                              </th>
                          </tr>
                        </thead>
                        <tbody>
                          { orders.data?.length !==0 ? 
                            (orders.data?.sort((a,b) => a.order_number - b.order_number)
                              .map((item, index) => (
                                <tr key={index} className="justify-start bg-white border-b hover:bg-gray-50">
                                    <td className="w-10 py-3 pl-6 pr-2">
                                    #{item.order_number}
                                    </td>
                                    <td className="px-6 py-3 text-left">
                                      {item.order_items?.map( (item, index) => 
                                          <div key={index}>{item.name}, {item.qty} x @{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</div>
                                      )}
                                    </td>
                                    <td className="px-6 py-3">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.order_items?.map( item => item.qty * item.price).reduce((preVal, currentVal) => preVal + currentVal, 0))}
                                    </td>
                                    <td className="px-6 py-3">
                                    {item.status}
                                    </td>
                                    <td className="px-6 py-3">
                                      <button onClick={() => navigate(`/user/invoice/${item.id}`)} className='px-2 py-1 text-gray-700 rounded-md hover:ring hover:ring-sky-200 hover:bg-sky-300 bg-sky-200'>invoice</button>
                                    </td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                              <td className='px-6 py-3'>-</td>
                              <td className='px-6 py-3 text-left'>-</td>
                              <td className='px-6 py-3'>-</td>
                              <td className='px-6 py-3'>-</td>
                              <td className='px-6 py-3'>-</td>
                            </tr>
                            )
                          }
                        </tbody>
                    </table>
                  </div>
                </Tab.Panel>

                {/* Address section */}
                <Tab.Panel className={'bg-sky-50 border-blue-500 border-2 overflow-hidden rounded-md'}>
                  <div className='mx-4 my-4'>
                    <div className='my-4 text-xl font-semibold text-center text-gray-600 uppercase '>Delivery Addresses</div>
                    <div className="relative my-4 overflow-x-auto rounded-lg shadow-md">
                      <table className="w-full text-sm text-center text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-sky-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Street
                                </th>
                                <th scope="col" className="px-6 py-3">
                                District
                                </th>
                                <th scope="col" className="px-6 py-3">
                                City
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Province
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Postal Code
                                </th>
                            </tr>
                          </thead>
                          <tbody>
                            { address.length !== 0 ? 
                              address
                                .sort((a,b) => {
                                  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                                  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                                  if (nameA < nameB) {
                                    return -1;
                                  }
                                  if (nameA > nameB) {
                                    return 1;
                                  }

                                  // names must be equal
                                  return 0;
                                })
                                .map( (item, index) => (
                                <tr key={index} className="justify-start bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">
                                    {item.name}
                                    </td>
                                    <td className="px-6 py-3">
                                    {item.street}
                                    </td>
                                    <td className="px-6 py-3">
                                    {item.district}
                                    </td>
                                    <td className="px-6 py-3">
                                    {item.city}
                                    </td>
                                    <td className="px-6 py-3">
                                    {item.province}
                                    </td>
                                    <td className="px-6 py-3">
                                    {item.postal_code}
                                    </td>
                                </tr>
                              ))
                              : (
                                <tr>
                                  <td className='px-6 py-3'>-</td>
                                  <td className='px-6 py-3'>-</td>
                                  <td className='px-6 py-3'>-</td>
                                  <td className='px-6 py-3'>-</td>
                                  <td className='px-6 py-3'>-</td>
                                  <td className='px-6 py-3'>-</td>
                                  <td className='px-6 py-3'>-</td>
                                </tr>
                                )
                            }
                          </tbody>
                      </table>
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={() => navigate('/user/address')} className='px-2 py-1 bg-green-300 rounded-md shadow-sm'>Add Address</button>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  )
}
