"use client"
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit'
import { AuthContext, Currency, OrderState, PaymentStandard, placeOrderMessage } from '@monerium/sdk'
import { useAuth } from '@/context/AuthContext';
import LoginWithMonerium from './LoginwithMonerium';
import Connected from './Connected';

const MONERIUM_TOKEN = 'monerium_token'

const MoneriumPage = () => {

    const [authContext, setAuthContext] = useState<AuthContext>()
    const [safeThreshold, setSafeThreshold] = useState<string>()
    const [moneriumClient, setMoneriumClient] = useState<SafeMoneriumClient>()
    const [moneriumPack, setMoneriumPack] = useState<MoneriumPack>()
    const [orderState, setOrderState] = useState<OrderState>()
    const { isLoggedIn, selectedSafe, provider: authProvider } = useAuth()

    useEffect(() => {
        ; (async () => {
            if (!authProvider || !selectedSafe) return

            const provider = new ethers.BrowserProvider(authProvider)

            const safeOwner = await provider.getSigner()
            const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: safeOwner })

            const safeSdk = await Safe.create({
                ethAdapter: ethAdapter,
                safeAddress: selectedSafe,
                isL1SafeSingleton: true
            })

            const pack = new MoneriumPack({
                clientId: '2040e3b2-b2d4-11ee-a3f4-524d6b1e805e',
                environment: 'sandbox'
            })

            await pack.init({
                safeSdk
            })

            pack.subscribe(OrderState.pending, (notification) => {
                setOrderState(notification.meta.state)
            })

            pack.subscribe(OrderState.placed, (notification) => {
                setOrderState(notification.meta.state)
            })

            pack.subscribe(OrderState.rejected, (notification) => {
                setOrderState(notification.meta.state)
                setTimeout(() => {
                    setOrderState(undefined)
                }, 5000)
            })

            pack.subscribe(OrderState.processed, (notification) => {
                setOrderState(notification.meta.state)
                setTimeout(() => {
                    setOrderState(undefined)
                }, 5000)
            })

            const threshold = await safeSdk.getThreshold()
            const owners = await safeSdk.getOwners()

            setSafeThreshold(`${threshold}/${owners.length}`)
            setMoneriumPack(pack)
        })()
    }, [authProvider, selectedSafe])

    useEffect(() => {
        const authCode = new URLSearchParams(window.location.search).get('code') || undefined
        const refreshToken = localStorage.getItem(MONERIUM_TOKEN) || undefined

        if (authCode || refreshToken) startMoneriumFlow(authCode, refreshToken)
    }, [moneriumPack])

    const startMoneriumFlow = async (authCode?: string, refreshToken?: string) => {
        console.log("Monerium pack", moneriumPack);
        if (!moneriumPack) return

        const moneriumClient = await moneriumPack.open({
            redirectUrl: 'http://localhost:3000/monerium/wallet',
            authCode,
            refreshToken
        })

        const authContext = await moneriumClient.getAuthContext()
        const profile = await moneriumClient.getProfile(authContext.defaultProfile)
        const balances = await moneriumClient.getBalances()
        const orders = await moneriumClient.getOrders()

        console.group('Monerium data')
        console.log('AuthContext', authContext)
        console.log('Profile', profile)
        console.log('Balances', balances)
        console.log('Orders', orders)
        console.log('Bearer Profile', moneriumClient.bearerProfile)
        console.groupEnd()

        if (moneriumClient.bearerProfile) {
            localStorage.setItem(MONERIUM_TOKEN, moneriumClient.bearerProfile.refresh_token)
        }

        setMoneriumClient(moneriumClient)
        setAuthContext(authContext)
    }

    const closeMoneriumFlow = async () => {
        moneriumPack?.close()
        localStorage.removeItem(MONERIUM_TOKEN)
        setAuthContext(undefined)
    }

    const transfer = async (iban: string, amount: string) => {

        const S_amount = amount?.toString();
        // const chainId = chainSelected.chainId;
        // const currency = 'eur';

        const message = placeOrderMessage(S_amount, iban);
        console.log("Message", message);

        const signature = await moneriumClient?.signMessage(selectedSafe, message);
        console.log("Signature", signature);


        // const tx = await moneriumClient?.placeOrder({
        //     amount: S_amount,
        //     message: message,
        //     signature: '0x',
        //     Currency: 'eur',
        //     address: selectedSafe,
        //     counterpart: {
        //         identifier: {
        //             standard: 'iban' as PaymentStandard.iban,
        //             iban
        //         },
        //         details: {
        //             firstName: 'John',
        //             lastName: 'Doe',
        //             country: 'ES'
        //         }
        //     },
        //     memo: 'Testing Safe-Monerium integration',
        //     chain: 'ethereum',
        //     network: 'goerli',
        // })





        const tx = await moneriumClient?.send({
            amount,
            currency: Currency.eur,
            counterpart: {
                identifier: {
                    standard: 'iban' as PaymentStandard.iban,
                    iban
                },
                details: {
                    firstName: 'John',
                    lastName: 'Doe',
                    country: 'ES'
                }
            },
            memo: 'Testing Safe-Monerium integration'
        })

        console.log('New proposed transaction', tx)
    }


    return (
        <div>
            Hey Monerium
            {authContext ? (
                <Connected
                    safe={selectedSafe}
                    orderState={orderState}
                    authContext={authContext}
                    onTransfer={transfer}
                    onLogout={closeMoneriumFlow}
                />
            ) : (
                <>
                    {/* {!selectedSafe && <DeploySafe />} */}
                    {!selectedSafe && <> Safe is not selected</>}

                    {selectedSafe && (
                        <LoginWithMonerium
                            safe={selectedSafe}
                            threshold={safeThreshold || ''}
                            onLogin={() => startMoneriumFlow()}
                        />
                    )}


                </>
            )}
        </div>
    );
};

export default MoneriumPage;