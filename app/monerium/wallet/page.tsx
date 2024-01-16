"use client"
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit';
import React, { useEffect, useState } from 'react';
import { AuthContext, Currency, OrderState, PaymentStandard, placeOrderMessage } from '@monerium/sdk'
import { useAuth } from '@/context/AuthContext';
import { ethers } from 'ethers';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import Connected from '../Connected';
import PayToWallet from './PayToWallet';

const MONERIUM_TOKEN = 'monerium_token'


const MoneriumWallet = () => {

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

    console.log("Monerium Pack", moneriumPack);


    useEffect(() => {
        const authCode = new URLSearchParams(window.location.search).get('code') || undefined
        const refreshToken = localStorage.getItem(MONERIUM_TOKEN) || undefined

        console.log("Code and token", authCode, refreshToken);

        if (authCode || refreshToken) startMoneriumFlow(authCode, refreshToken)
    }, [moneriumPack])

    const startMoneriumFlow = async (authCode?: string, refreshToken?: string) => {
        console.log("Monerium pack", moneriumPack);
        if (!moneriumPack) return

        const safeMoneriumClient = await moneriumPack.open(
            {
                authCode: authCode,
                refreshToken: refreshToken
            }
        )
        console.log("safeMoneriumClient", safeMoneriumClient);

        const authContext = await safeMoneriumClient.getAuthContext()
        const profile = await safeMoneriumClient.getProfile(authContext.defaultProfile)
        const balances = await safeMoneriumClient.getBalances()
        const orders = await safeMoneriumClient.getOrders()

        console.group('Monerium data')
        console.log('AuthContext', authContext)
        console.log('Profile', profile)
        console.log('Balances', balances)
        console.log('Orders', orders)
        console.log('Bearer Profile', safeMoneriumClient.bearerProfile)
        console.groupEnd()

        if (safeMoneriumClient.bearerProfile) {
            console.log("Setting on loccal storage");
            localStorage.setItem(MONERIUM_TOKEN, safeMoneriumClient.bearerProfile.refresh_token)
        }

        setMoneriumClient(safeMoneriumClient)
        setAuthContext(authContext)
    }

    const closeMoneriumFlow = async () => {
        moneriumPack?.close()
        localStorage.removeItem(MONERIUM_TOKEN)
        setAuthContext(undefined)
    }

    const transfer = async (iban: string, amount: string) => {
        const tx = await moneriumClient?.send({
            amount,
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

    console.log("AuthContext", authContext);


    return (
        <div>
            hey monerium client
            {authContext && <Connected
                safe={selectedSafe}
                orderState={orderState}
                authContext={authContext}
                onTransfer={transfer}
                onLogout={closeMoneriumFlow}
            />}

            {authContext && (
                <PayToWallet
                    moneriumClient={moneriumClient}
                    orderState={orderState}

                />
            )}


        </div>
    );
};

export default MoneriumWallet;