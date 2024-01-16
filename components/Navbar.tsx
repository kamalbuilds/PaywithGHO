"use client"
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import Address from './Address';

const Navbar = () => {

    const { logIn, logOut, isLoggedIn, data, selectedSafe, setSelectedSafe } = useAuth()

    console.log("Data", data);

    return (
        <div className='flex flex-row gap-4 justify-end mr-8'>

            {isLoggedIn ? (
                <>
                    {data && <Address address={data.eoa} />}

                    <div className='border rounded-lg border-gray-600 px-2 py-1 my-4 cursor-pointer' onClick={logOut}>
                        Sign out
                    </div>
                </>
            ) : (
                <>
                    <div className='border rounded-lg border-gray-600 px-2 py-1 my-4 cursor-pointer' onClick={logIn}>
                        Sign in
                    </div>
                </>
            )}



        </div>
    );
};

export default Navbar;