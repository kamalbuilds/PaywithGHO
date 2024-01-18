"use client";

import type { NextPage } from "next";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useState } from "react";
import { InterestRate, Pool, PoolBundle } from "@aave/contract-helpers";
import { AaveV3GoerliGho } from "@bgd-labs/aave-address-book";
import { AuthContextProvider, useAuth } from '@/context/AuthContext';

const Interact: NextPage = () => {

    const [address, setAddress] = useState<string>();
    const [txStatus, setTxStatus] = useState<string>();
    const [ghopool, setGhoPool ] = useState<any>();

    const { provider } = useAuth();
    const signer = provider?.getSigner();

    console.log(signer, "singer");

    const borrowGho = async () => {
        if (provider && signer) {

            const address = await signer?.getAddress();
            setAddress(address);

            const pool = new PoolBundle(provider, {
                POOL: AaveV3GoerliGho.POOL,
            });

            console.log(pool);
            const borrowTx = pool.borrowTxBuilder.generateTxData({
                user: address || "",
                reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",
                amount: parseUnits("100", 18).toString(),
                interestRateMode: InterestRate.Variable,
            });


            //TODO @abhishek-01k 
            signer
                .sendTransaction(borrowTx)
                .then((txResponse) => {
                    setTxStatus(`Tx submitted with hash ${txResponse.hash}`);
                    return txResponse.wait(); // Wait for the transaction to be confirmed
                })
                .then((txReceipt) => {
                    setTxStatus(`Tx confirmed with hash ${txReceipt.transactionHash}`);
                })
                .catch((error) => {
                    setTxStatus(`Tx failed :( with error ${error.toString()}`);
                });
        }
    };

    const supplyasset = async () =>{

        const pool = new PoolBundle(provider, {
            POOL: AaveV3GoerliGho.POOL,
        });

        const supply = await pool.supplyTxBuilder.generateTxData({
            user : address || "",
            reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",
            amount: '10',
            onBehalfOf: address,
        });
    }

    const repayasset = async () =>{

        const pool = new PoolBundle(provider, {
            POOL: AaveV3GoerliGho.POOL,
        });

        const repay = await pool.repayTxBuilder.generateTxData({
            user : address || "",
            reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",
            amount: '10',
            onBehalfOf: address,
            interestRateMode: InterestRate.Variable,
            // onBehalfOf?: tEthereumAddress;
            // useOptimizedPath?: boolean;
        });
    }


    return (
        <main>
            <h1>GHO Demo</h1>
            {address && <h3>Address: {address}</h3>}
            {txStatus && <p>Status: {txStatus}</p>}
            <button onClick={borrowGho}>Mint GHO</button>
        </main>
    );
};

export default Interact;