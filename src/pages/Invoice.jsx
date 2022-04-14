import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../components/Container'
import { api } from '../helper';

export default function Invoice() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState({})

    const authHeaders = {
        headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
    }}

    const getInvoice = async () => {
        try {
            await axios
                .get(`${api}/api/invoices/${id}`, authHeaders)
                .then( res => setInvoice(res.data))
                
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = () => {
        navigate('/user/account')
    }

    useEffect(() => {
        getInvoice();
    }, [])


  return (
    <Container className={'w-3/5'}>
        <div className='pb-6 text-2xl font-medium text-center text-gray-800 uppercase'>INVOICE</div>
        <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-sky-300 ">
            <tr>
                <th scope="col" className="px-4 py-2">
                Field
                </th>
                <th scope="col" className="px-4 py-2">
                Description
                </th>
            </tr>
            </thead>
            <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                Payment status
                </th>
                <td className="px-4 py-2">
                {invoice.payment_status}
                </td>
            </tr>
            <tr className="bg-white border-b">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 ">
                Order ID
                </th>
                <td className="px-4 py-2">
                #{invoice.order?.order_number}
                </td>
            </tr>
            <tr className="bg-white border-b">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 ">
                Name
                </th>
                <td className="px-4 py-2">
                {invoice.user?.full_name}
                </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                Delivery fee
                </th>
                <td className="px-4 py-2">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(invoice.delivery_fee)}
                </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                Total amount
                </th>
                <td className="px-4 py-2">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(invoice.total)}
                </td>
            </tr>
            <tr className="items-start bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                Billed to
                </th>
                <td className="px-4 py-2">
                    <p>{invoice.user?.full_name}</p>
                    <p>{invoice.user?.email}</p>
                    <p>{invoice.delivery_address?.street}</p>
                    <p>{invoice.delivery_address?.city}, {invoice.delivery_address?.province} {invoice.delivery_address?.postal_code}</p>
                </td>
            </tr>
            <tr className="items-start bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                Payment to
                </th>
                <td className="px-4 py-2">
                    <p>Fajrianwar Fachrul</p>
                    <p>fajrianwarfachrul@gmail.com</p>
                    <p>MANDIRI BANK</p>
                    <p>xxxx - xxxx - 3530</p>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        <div className='flex justify-end'>
            <button onClick={() => handleClick()} className='px-4 py-1 mt-3 text-blue-600 bg-white border border-blue-600 rounded-md'>OK</button>
        </div>
    </Container>
  )
}
