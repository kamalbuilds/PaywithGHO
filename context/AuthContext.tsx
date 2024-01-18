// @ts-nocheck
"use client"
import React, { createContext, useEffect, useState } from "react";
import {
    SafeAuthPack,
    SafeAuthConfig,
    AuthKitSignInData,
    SafeAuthInitOptions,
} from '@safe-global/auth-kit'
import Safe, { SafeFactory, SafeAccountConfig , Web3Adapter} from '@safe-global/protocol-kit';
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

type AuthContextProviderProps = {
    children: React.ReactNode
}

type AuthContextType = {
    isLoggedIn: boolean
    provider: ethers.Eip1193Provider | null
    data?: AuthKitSignInData
    selectedSafe: string
    isSafeLoading?: boolean
    setSelectedSafe?: (safe: string) => void
    logIn?: () => void
    logOut?: () => void
    deployNewSafeWallet?: () => void

}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    selectedSafe: '',
    provider: null
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const [safeAuthPack, setSafeAuthPack] = useState<SafeAuthPack>()
    const [isAuthenticated, setIsAuthenticated] = useState(!!safeAuthPack?.isAuthenticated)
    const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData>()
    const [provider, setProvider] = useState<ethers.Eip1193Provider | null>()
    const [selectedSafe, setSelectedSafe] = useState('')

    const [isSafeLoading, setIsSafeLoading] = useState<boolean>(false);

    useEffect(() => {
        ; (async () => {
            setIsSafeLoading(true);
            const authPack = new SafeAuthPack()

            const options: SafeAuthInitOptions = {
                enableLogging: false,
                showWidgetButton: true,
                chainConfig: {
                    // chainId: '0xaa36a7', 
                    chainId: '0x5',
                    // rpcTarget: 'https://eth-sepolia.g.alchemy.com/v2/DU0xK0nck0Bt7hWgodif5n_UctwzaX5R' 
                    rpcTarget: 'https://eth-goerli.g.alchemy.com/v2/F1Pki8Inoa2E7rVheYmIEBQU-VA2tpv8'
                }
            }

            await authPack.init(options)

            setSafeAuthPack(authPack)


            authPack.subscribe('accountsChanged', async (accounts: string[]) => {
                console.log("Accounts changed", accounts);
                if (accounts.length > 0) {
                    const signInInfo = await authPack?.signIn()

                    setSafeAuthSignInResponse(signInInfo)
                    setIsAuthenticated(true)

                    if (signInInfo.safes && signInInfo.safes.length > 0) {
                        setSelectedSafe(signInInfo?.safes[0])
                    }
                }
            })

            setIsSafeLoading(false);
        })()
    }, [])

    useEffect(() => {
        if (!safeAuthPack || !isAuthenticated) return

        setProvider(safeAuthPack.getProvider())
    }, [isAuthenticated])

    const logIn = async () => {
        if (!safeAuthPack) return

        const signInInfo = await safeAuthPack.signIn()
        setSafeAuthSignInResponse(signInInfo)
        setIsAuthenticated(true)

        if (signInInfo?.safes && signInInfo.safes.length > 0) {
            setSelectedSafe(signInInfo?.safes[0])
        }
    }

    const logOut = async () => {
        if (!safeAuthPack) return

        await safeAuthPack.signOut()

        setProvider(undefined)
        setSafeAuthSignInResponse(undefined)
        setIsAuthenticated(false)
    }

    const deployNewSafeWallet = async () => {
        if (!safeAuthPack) return

        const provider = new Web3Provider(safeAuthPack?.getProvider()) ;
        const signer = await provider.getSigner();

        console.log(Safe);
        const safeFactory = await SafeFactory.create({ ethAdapter })

        const owners = ['0x<address>', '0x<address>', '0x<address>']
        const threshold = 3
        const safeAccountConfig: SafeAccountConfig = {
          owners,
          threshold
        //   to, // Optional
        //   data, // Optional
        //   fallbackHandler, // Optional
        //   paymentToken, // Optional
        //   payment, // Optional
        //   paymentReceiver // Optional
        }
        
        const safe: Safe = await safeFactory.deploySafe({ safeAccountConfig })

        console.log("SAFE Created!", await safe.getAddress());

        const safeAddress = await safe.getAddress();
        if (safeAddress) {
            setSelectedSafe(safeAddress)
        }

    }


    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isAuthenticated,
                provider: provider || null,
                data: safeAuthSignInResponse,
                logIn,
                logOut,
                selectedSafe,
                setSelectedSafe,
                deployNewSafeWallet,
                isSafeLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = React.useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthContextProvider')
    }

    return context
}

export { AuthContextProvider, useAuth }