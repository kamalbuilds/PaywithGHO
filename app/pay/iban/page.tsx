"use client"
import { useAuth } from '@/context/AuthContext';
import { AuthContext, Balances, Order, OrderState, Profile } from '@monerium/sdk';
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

const MONERIUM_TOKEN = 'monerium_token'

const IbanPage = () => {

    const { isLoggedIn, selectedSafe, provider: authProvider } = useAuth()

    const [orderState, setOrderState] = useState<OrderState>()
    const [safeThreshold, setSafeThreshold] = useState<string>()
    const [moneriumPack, setMoneriumPack] = useState<MoneriumPack>()
    const [moneriumClient, setMoneriumClient] = useState<SafeMoneriumClient>()

    //Monerium Details
    const [authContext, setAuthContext] = useState<AuthContext>()
    const [profile, setprofile] = useState<Profile>();
    const [balances, setBalances] = useState<Balances[]>();
    const [orders, setOrders] = useState<Order[]>();

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
            redirectUrl: 'http://localhost:3000/pay',
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

        setprofile(profile);
        setBalances(balances);
        setOrders(orders);

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

    return (
        <div>
            Iban Page
        </div>
    );
};

export default IbanPage;