import CarItem from '@/components/CarItem';
import { Button } from './../../components/ui/button.jsx'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from "react-icons/fa";

function MyListing() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [carLists, setCarLists] = useState([]);

    useEffect(() => {
        GetUserCarListing();
    }, [user])
    useEffect(() => {
        console.log('car fetched successfully:', carLists);
    }, [carLists])
    const GetUserCarListing = async (req, res) => {

        try {
            const response = await fetch(`http://localhost:4000/api/cars/getusercarlisting?createdby=${user?.primaryEmailAddress?.emailAddress}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (!response.ok) {
                throw new Error('Failed to fetch cars');
            }

            const result = await response.json();
            setCarLists(result);

            // alert('Listing fetched successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            // alert('Error in fecthcing form . Please try again.');
        }
    }

    async function deletecarlist(id) {
        try {
            const response = await fetch(`http://localhost:4000/api/cars/deletecarlist?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (!response.ok) {
                throw new Error('Failed to delete cars');
            }
            window.location.reload()

        } catch (error) {
            console.error('Error deleting car data:', error);
        }
    }

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Link to={'/add-listing'}>
                    <Button>+ Add New Listing</Button>
                </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                {
                    carLists.map((car, index) => (
                        <div key={index} >
                            <CarItem car={car} />
                            <div className='p-2 gap-3 bg-gray-50 rounded-lg flex justify-between'>
                                <Link className='w-full'
                                to={`/add-listing?mode=edit&id=${car._id}`}
                                >
                                    <Button className='rounded-[0.4rem] text-black bg-slate-300 w-full hover:bg-slate-300 active:bg-slate-200 focus:bg-slate-200'>Edit</Button>
                                </Link>
                                <Button className='rounded-[0.4rem] text-white bg-red-500' onClick={()=>deletecarlist(car._id)}><FaTrashAlt /></Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyListing