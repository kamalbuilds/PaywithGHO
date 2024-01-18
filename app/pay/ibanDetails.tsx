"use client"
import Address from '@/components/Address';
import { useAuth } from '@/context/AuthContext';
import { AuthContext, Balances, Order, Profile } from '@monerium/sdk';
import React, { useState } from 'react';

type IbanDetailContext = {
    authContext: AuthContext | undefined
    profile: Profile | undefined
    balances: Balances[] | undefined
    orders: Order[] | undefined
}

const IbanDetails = ({
    authContext,
    profile,
    balances,
    orders
}: IbanDetailContext) => {

    const { selectedSafe } = useAuth()
    const accounts = profile?.accounts;
    const profileOfWallet = accounts?.find((detail) => {
        return detail.currency.toLowerCase() === 'eur' &&
            detail.address.toLowerCase() === selectedSafe.toLowerCase() && detail.network === 'goerli';
    });

    const [displayId, setDisplayId] = useState('');

    const handleDisplayOrder = (id: string) => {
        setDisplayId(id);
    }


    return (
        <div>

            <div className='text-3xl font-800 font-medium text-muted-foreground text-center my-4'>Orders</div>
            <div className='px-2 flex flex-col gap-2'>

                {orders ? (
                    <>
                        {orders?.map((order) => {
                            if (order.accountId !== profileOfWallet?.id) return
                            return (
                                <div className='flex flex-col gap-2 cursor-pointer '>
                                    <div onClick={() => handleDisplayOrder(order.id)}
                                        className={`${displayId == order.id ? 'border-gray-800' : ''} flex flex-row rounded-md justify-between border cursor-pointer font-500 text-lg tracking-tight px-4 py-2`}
                                    >
                                        <div>{order.counterpart.details.name ? order.counterpart.details.name : 'Unknown'}</div>
                                        <div>{order.counterpart.identifier.iban ? order.counterpart.identifier.iban : 'NA'}</div>
                                        <div>-€{order.meta.sentAmount}</div>
                                    </div>
                                    <div className={`${displayId == order.id ? 'flex' : 'hidden'} md:flex-row flex-col px-4 py-2 gap-8 border rounded-md rounded-t-none`}>
                                        <div className='flex flex-col gap-2 flex-1'>
                                            <div className='flex flex-row justify-between'>
                                                <div className='text-lg font-600'>IBAN</div>
                                                <div className='text-sm font-400 text-grey-400'>{order.counterpart.identifier.iban ? order.counterpart.identifier.iban : 'NA'}</div>
                                            </div>
                                            <div className='flex flex-row justify-between'>
                                                <div className='text-lg font-600'>Name</div>
                                                <div className='text-sm font-400 text-grey-400'>{order.counterpart.details.name ? order.counterpart.details.name : 'Unknown'}</div>
                                            </div>
                                            <div className='flex flex-row justify-between'>
                                                <div className='text-lg font-600'>Reference / Memo</div>
                                                <div className='text-sm font-400 text-grey-400'>{order.memo}</div>
                                            </div>
                                            <div className='flex flex-row justify-between'>
                                                <div className='text-lg font-600'>Transaction</div>
                                                <div className='text-sm font-400 text-grey-400'>
                                                    <Address address={order.txHashes[0]} showBlockExplorerLink />
                                                </div>
                                            </div>
                                            <div className='flex flex-row justify-between'>
                                                <div className='text-lg font-600'>Date and time</div>
                                                <div className='text-sm font-400 text-grey-400'>18/01/2024 - 03:27:34</div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2 flex-1'>
                                            <div className='flex flex-row justify-between'>
                                                <div className='text-lg font-600'>Amount sent from wallet</div>
                                                <div className='text-sm font-400 text-grey-400'>-€{order.meta.sentAmount}</div>
                                            </div>
                                            <div className='flex flex-row justify-between'>
                                                <div className='text-lg font-600'>Status</div>
                                                <div className='text-sm font-400 text-grey-400'>{order.meta.state}</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <>
                        No Orders yet
                    </>
                )}
            </div>
        </div>
    );
};

export default IbanDetails;