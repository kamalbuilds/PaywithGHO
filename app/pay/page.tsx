"use client"
import { useAuth } from '@/context/AuthContext';
import { AuthContext, Balances, Order, OrderState, Profile } from '@monerium/sdk';
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import Safe, { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import LoginWithMonerium from './LoginWithMonerium';
import IbanDetails from './ibanDetails';
import PayForm from './PayForm';
import { buttonVariants } from '@/components/ui/button';
import { toast } from 'react-toastify';
import Userbalance from './Userbalance';

const MONERIUM_TOKEN = 'monerium_token'

const PayPage = () => {

    const { isLoggedIn, selectedSafe, isSafeLoading, provider: authProvider } = useAuth()

    const [orderState, setOrderState] = useState<OrderState>()
    const [safeThreshold, setSafeThreshold] = useState<string>()
    const [moneriumPack, setMoneriumPack] = useState<MoneriumPack>()
    const [moneriumClient, setMoneriumClient] = useState<SafeMoneriumClient>()

    const [protocolKit, setProtocolKit] = useState<Safe>();

    //Monerium Details
    const [authContext, setAuthContext] = useState<AuthContext>()
    const [profile, setprofile] = useState<Profile>();
    const [balances, setBalances] = useState<Balances[]>();
    const [orders, setOrders] = useState<Order[]>();

    const [loadingIBAN, setIsLoadingIBAN] = useState<boolean>(false);
    const [settingMonerium, setSettingMonerium] = useState<boolean>(false);

    const notify = () => toast.success("Safe Deployed!");

    useEffect(() => {
        ; (async () => {
            if (!authProvider || !selectedSafe) return

            setSettingMonerium(true);
            // const provider = new ethers.providers.Web3Provider(authProvider)

            const safeOwner = await authProvider.getSigner();

            // const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: safeOwner })

            const ethAdapter = new EthersAdapter({
                ethers,
                signerOrProvider: safeOwner,
            } as any);

            const safeSdk = await Safe.create({
                ethAdapter: ethAdapter,
                safeAddress: selectedSafe,
                isL1SafeSingleton: true
            })

            console.log("safe sdk", safeSdk)

            setProtocolKit(safeSdk);

            const pack = new MoneriumPack({
                // redirectUrl: 'http://localhost:3000/pay',
                clientId: '2040e3b2-b2d4-11ee-a3f4-524d6b1e805e',
                environment: 'sandbox'
            })

            await pack.init({
                safeSdk
            })

            setMoneriumPack(pack)
            setSettingMonerium(false);

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

        })()
    }, [authProvider, selectedSafe])

    useEffect(() => {
        const authCode = new URLSearchParams(window.location.search).get('code') || undefined
        const refreshToken = localStorage.getItem(MONERIUM_TOKEN) || undefined

        if (authCode || refreshToken) startMoneriumFlow(authCode, refreshToken)
    }, [moneriumPack])

    const startMoneriumFlow = async (authCode?: string, refreshToken?: string) => {
        if (!moneriumPack) return

        setIsLoadingIBAN(true);
        const moneriumClient = await moneriumPack.open({
            redirectUrl: 'http://localhost:3000/pay',
            authCode,
            refreshToken
        })

        const authContext = await moneriumClient.getAuthContext()
        const profile = await moneriumClient.getProfile(authContext.defaultProfile)
        const balances = await moneriumClient.getBalances()
        const orders = await moneriumClient.getOrders()

        setprofile(profile);
        setBalances(balances);
        setOrders(orders);

        if (moneriumClient.bearerProfile) {
            localStorage.setItem(MONERIUM_TOKEN, moneriumClient.bearerProfile.refresh_token)
        }

        setMoneriumClient(moneriumClient)
        setAuthContext(authContext)
        setIsLoadingIBAN(false);
    }

    const closeMoneriumFlow = async () => {
        moneriumPack?.close()
        localStorage.removeItem(MONERIUM_TOKEN)
        setAuthContext(undefined)
    }


    return (
        <>
            {isLoggedIn ? <div className='mt-12'>

                <div className='flex items-center justify-center text-4xl font-medium text-muted-foreground'>Pay with IBAN</div>

                {settingMonerium ? (
                    <div className='flex items-center justify-center mt-4'>Setting Monerium Pack...</div>
                ) : loadingIBAN ? (
                    <div className='flex items-center justify-center'>
                        Loading IBAN...
                    </div>
                ) : (
                    <>

                        {authContext ? (
                            <>
                                <div className='flex flex-col gap-8'>
                                    <PayForm
                                        moneriumClient={moneriumClient}
                                        closeMoneriumFlow={closeMoneriumFlow}
                                        protocolKit={protocolKit}
                                        moneriumPack={moneriumPack}
                                        balances={balances}
                                    />

                                    <IbanDetails
                                        authContext={authContext}
                                        profile={profile}
                                        balances={balances}
                                        orders={orders}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                {!selectedSafe && <div className='flex '>
                                    <div className='flex flex-col gap-2'>
                                        <div className='text-xl'>Safe is not deployed. Deploy a new oner</div>
                                        <div className={buttonVariants()}>
                                            Deploy Safe
                                        </div>
                                        <button onClick={notify} >toast</button>
                                    </div>
                                </div>}

                                {selectedSafe && (
                                    <LoginWithMonerium
                                        safe={selectedSafe}
                                        threshold={safeThreshold || ''}
                                        onLogin={() => startMoneriumFlow()}
                                    />
                                )}


                            </>
                        )}
                    </>
                )}

            </div> : (
                <div className='flex items-center justify-center mt-12'> You need to log In to Safe to access this.</div>
            )}
        </>
    );
};

export default PayPage;