import React from 'react';

const CHAR_DISPLAYED = 6

const Address = ({ address }: any) => {

    const firstPart = address?.slice(0, CHAR_DISPLAYED)
    const lastPart = address?.slice(address?.length - CHAR_DISPLAYED)

    return (
        <div className='border px-2 py-1 my-4 border-gray-600 rounded-md'>
            {firstPart}...{lastPart}
        </div>
    );
};

export default Address;