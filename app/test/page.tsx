"use client"
import Dropdown from '@/components/Dropdown';
import React, { useState } from 'react';

const TestPage = () => {

    const [chainSelected, setChainSelected] = useState<any>();
    const [receiverWalletAddress, setReceiverWalletAddress] = useState<string>();
    const [amount, setAmount] = useState<number>();

    const chains = [
        { chainId: 80001, name: 'Polygon' },
        { chainId: 5, name: 'Goerli' }
    ]

    const handleClick = (chain: any) => {
        console.log("Chain Details clicked", chain);
        setChainSelected(chain);
    }

    const transfer = () => {
        if (!chainSelected) {
            console.log("Chain not selected");
            return;
        }

        if (chainSelected) {
            const chainId = chainSelected.chainId;
            const input = {
                receiverWalletAddress,
                amount,
                chainId
            }

            console.log("Input", input);
        }



    }

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

                    <button className='border border-grey-600 rounded-lg mt-8 px-2 py-1' onClick={transfer}>Transfer</button>
                </div>
            </div>
        </div>
    );
};

export default TestPage;