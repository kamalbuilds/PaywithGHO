import { buttonVariants } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

const Userbalance = ({
    closeMoneriumFlow,
    balances
}: any) => {

    const { selectedSafe } = useAuth();

    const balanceofUser = balances?.filter((balance) => {
        return balance.address.toLowerCase() == selectedSafe.toLowerCase()
    })

    return (
        <div className='flex flex-col gap-16 justify-between my-12'>
            <div className='flex gap-8 flex-col'>
                <div className='text-3xl font-500 leading-tight tracking-tighter'>User Balance</div>
                <div>
                    {balanceofUser.map((balance, index) => {
                        return (
                            <div key={index} className='flex gap-4'>
                                <div className='flex gap-1 text-xl capitalize'>
                                    <div>{balance.chain}</div>
                                    <div>{balance.network}</div>
                                </div>
                                <div className='text-lg text-gray-500'>
                                    {balance.balances.map((item) => {
                                        return (
                                            <div className='flex gap-1'>
                                                <div className='uppercase'>{item.currency}</div>
                                                <div>{item.amount}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='flex justify-start my-4'>
                <button className={buttonVariants()} onClick={closeMoneriumFlow}>Log Out Memorium</button>
            </div>
        </div>
    );
};

export default Userbalance;