"use client"
import Dropdown from '@/components/Dropdown';
import React, { useEffect, useState } from 'react';
import { PaymentStandard, placeOrderMessage, OrderState } from '@monerium/sdk'
import { useAuth } from '@/context/AuthContext';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';

const PayForm = ({
    moneriumClient,
    closeMoneriumFlow,
    protocolKit,
    moneriumPack
}: any) => {

    const { isLoggedIn, selectedSafe, provider: authProvider, safeSDKKit } = useAuth()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [counterpartIban, setCounterpartIban] = useState<string>('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [amount, setAmount] = useState(0);
    const [info, setInfo] = useState('');

    const [orderState, setOrderState] = useState<OrderState>()

    console.log("safeSDKKit", safeSDKKit);

    useEffect(() => {
        if (orderState === OrderState.processed || orderState === OrderState.rejected) {
            setCounterpartIban('')
            setTimeout(() => {
                setIsLoading(false)
            }, 5000)
        }
    }, [orderState])

    const handleTransfer = async () => {
        if (!firstName || !lastName || !amount || !info || !counterpartIban) {
            console.log("Input field is not filled")
            return;
        }

        if (!moneriumClient) {
            return;
        }

        const message = placeOrderMessage(amount, counterpartIban);
        console.log("Message", message);

        console.log("Input", firstName, lastName, amount, info, counterpartIban);

        const s_amount = amount.toString();
        console.log("S_AMOUNT", s_amount);
        const tx = await moneriumClient?.send({
            amount: s_amount,
            counterpart: {
                identifier: {
                    standard: 'iban' as PaymentStandard.iban,
                    iban: counterpartIban
                },
                details: {
                    firstName: firstName,
                    lastName: lastName,
                    country: 'ES'
                }
            },
            memo: info
        })

        console.log("New log transactions", tx);

        //TODO: Disable this if you want to go to safe wallet and then sign the transaction
        const txResult = await protocolKit.executeTransaction(tx);
        console.log("TxResult", txResult);

    }

    return (
        <div className='px-4'>

            <div className='flex justify-end my-4'>
                <button className={buttonVariants()} onClick={closeMoneriumFlow}>Log Out Memorium</button>
            </div>

            <div className='flex justify-center items-center'>
                <div className='flex flex-col gap-4 border border-[#c4c1c1] px-[30px] py-[30px] rounded-[20px] '>
                    <div className='flex flex-row gap-2'>
                        <Input
                            value={firstName}
                            type="text"
                            placeholder="Enter First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <Input
                            value={lastName}
                            type="text"
                            placeholder="Enter last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>


                    <Input
                        type="text"
                        placeholder="Enter amount"
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

                    <Input
                        value={info}
                        type='text'
                        placeholder='Info'
                        onChange={(e) => setInfo(e.target.value)}
                    />

                    <Input
                        value={counterpartIban}
                        type="text"
                        placeholder="Enter the IBAN "
                        onChange={(e) => setCounterpartIban(e.target.value)}
                    />


                    <button className={buttonVariants()} onClick={handleTransfer}>
                        Transfer
                    </button>
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

export default PayForm;