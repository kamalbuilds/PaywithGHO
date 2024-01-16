"use client"
import Dropdown from '@/components/Dropdown';
import React, { useEffect, useState } from 'react';
import { PaymentStandard, placeOrderMessage, OrderState } from '@monerium/sdk'
import { useAuth } from '@/context/AuthContext';


const PayToWallet = ({
    moneriumClient,
    orderState
}: any) => {

    const { isLoggedIn, selectedSafe, provider: authProvider } = useAuth()

    const [chainSelected, setChainSelected] = useState<any>();
    const [receiverWalletAddress, setReceiverWalletAddress] = useState<string>();
    const [amount, setAmount] = useState<number>();

    const chains = [
        { chainId: 80001, name: 'polygon', network: 'mumbai' },
        { chainId: 5, name: 'ethereum', network: 'goerli' }
    ]

    const handleClick = (chain: any) => {
        console.log("Chain Details clicked", chain);
        setChainSelected(chain);
    }

    const transferToWallet = async () => {
        if (!moneriumClient) {
            console.log("Monerium CLient is not initialised");
            return;
        }

        const S_amount = amount?.toString();
        const receiver = receiverWalletAddress;
        const chainId = chainSelected.chainId;
        const currency = 'eur';

        const message = placeOrderMessage(S_amount, receiver, chainId, currency);
        console.log("Message", message);

        const signature = await moneriumClient?.signMessage(selectedSafe, message);
        console.log("Signature", signature);

        const tx = await moneriumClient?.placeOrder({
            amount: S_amount,
            message: message,
            signature: '0x',
            Currency: 'eur',
            address: selectedSafe,
            counterpart: {
                identifier: {
                    standard: "chain" as PaymentStandard.chain,
                    address: receiverWalletAddress,
                    chain: chainSelected.name,
                    network: chainSelected.network,
                },
                details: {
                    firstName: 'John',
                    lastName: 'Doe',
                    country: 'ES'
                }
            },
            memo: 'Testing Safe-Monerium integration',
            chain: 'ethereum',
            network: 'goerli',
        })

        console.log('New proposed transaction', tx)
    }

    const [counterpartIban, setCounterpartIban] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (orderState === OrderState.processed || orderState === OrderState.rejected) {
            setCounterpartIban('')
            setTimeout(() => {
                setIsLoading(false)
            }, 5000)
        }
    }, [orderState])

    return (
        <div>
            <h1>Pay to Any wallet Address</h1>

            <div className='flex justify-center items-center'>
                <div className='flex flex-col gap-2'>
                    <input
                        placeholder='Enter the wallet address'
                        className='rounded-md w-[360px] text-black h-[40px] px-2 py-1'
                        onChange={(e) => setReceiverWalletAddress(e.target.value)}
                    />
                    <input
                        placeholder='Enter Amount'
                        className='rounded-md w-[360px] text-black h-[40px] px-2 py-1'
                        onChange={(e) => {
                            const inputText = e.target.value;
                            const numericValue = parseFloat(inputText);

                            if (!isNaN(numericValue)) {
                                // If the input is a valid number, update the state
                                setAmount(numericValue);
                            } else {
                                // If the input is not a valid number, do not update the state
                                // You can also provide feedback to the user (e.g., show an error message)
                                console.log('Please enter a valid number');
                            }
                        }}
                    />
                    <Dropdown chains={chains} handleClick={handleClick} activeChain={chainSelected} />

                    <button className='border border-grey-600 rounded-lg mt-8 px-2 py-1' onClick={transferToWallet}>Transfer</button>
                </div>
            </div>


            <div>
                {orderState && (
                    <>
                        {orderState === OrderState.placed && <div >Order placed</div>}
                        {orderState === OrderState.pending && <div >Order pending</div>}
                        {orderState === OrderState.rejected && <div >Order rejected</div>}
                        {orderState === OrderState.processed && (
                            <div>Order processed</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PayToWallet;