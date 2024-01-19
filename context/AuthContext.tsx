"use client"
import React, { createContext, useEffect, useState } from "react";
import {
    SafeAuthPack,
    SafeAuthConfig,
    AuthKitSignInData,
    SafeAuthInitOptions,
} from '@safe-global/auth-kit'
import Safe, { SafeFactory, SafeAccountConfig, Web3Adapter, EthersAdapter } from '@safe-global/protocol-kit';
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { toast } from "react-toastify";

type AuthContextProviderProps = {
    children: React.ReactNode
}

type AuthContextType = {
    isLoggedIn: boolean
    provider: ethers.providers.Web3Provider | null
    data?: AuthKitSignInData
    selectedSafe: string
    isSafeLoading?: boolean
    setSelectedSafe?: (safe: string) => void
    logIn?: () => void
    logOut?: () => void
    deployNewSafeWallet?: () => void
    safeSDKKit?: Safe

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
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>()
    const [selectedSafe, setSelectedSafe] = useState('');
    const [safeSDKKit, setSafeSDKKit] = useState<Safe>();
    const [isSafeLoading, setIsSafeLoading] = useState<boolean>(false);

    useEffect(() => {
        ; (async () => {
            setIsSafeLoading(true);
            const authPack = new SafeAuthPack()

            const options: SafeAuthInitOptions = {
                enableLogging: false,
                buttonPosition: 'bottom-right',
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

        setProvider(new Web3Provider(safeAuthPack.getProvider() as any))
    }, [isAuthenticated])

    // Safe sdk initiate
    useEffect(() => {
        ; (async () => {
            if (!provider || !selectedSafe) return

            const safeOwner = await provider.getSigner();

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
            setSafeSDKKit(safeSdk);

        })()

    }, [provider, selectedSafe])

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
        if (!provider) return

        const signer = await provider.getSigner();
        console.log("Provider", provider, signer);

        const ethAdapter = new EthersAdapter({
            ethers,
            signerOrProvider: signer,
        } as any);

        const safeFactory = await SafeFactory.create({ ethAdapter });

        const safe = await safeFactory.deploySafe({
            safeAccountConfig: { threshold: 1, owners: [safeAuthSignInResponse?.eoa as string] },
        });
        console.log("SAFE Created!", await safe.getAddress());
        console.log("SAFE Created!", await safe.getAddress());

        const safeAddress = await safe.getAddress();
        if (safeAddress) {
            setSelectedSafe(safeAddress)
            toast.success("Safe Deployed!")
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
                isSafeLoading,
                safeSDKKit
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