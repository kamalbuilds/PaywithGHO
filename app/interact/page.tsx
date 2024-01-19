"use client";

import type { NextPage } from "next";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useState } from "react";
import { InterestRate, Pool, PoolBundle } from "@aave/contract-helpers";
import { AaveV3GoerliGho } from "@bgd-labs/aave-address-book";
import { AuthContextProvider, useAuth } from '@/context/AuthContext';
import { buttonVariants } from "@/components/ui/button";

const Interact: NextPage = () => {

    const [address, setAddress] = useState<string>();
    const [txStatus, setTxStatus] = useState<string>();
    const [ghopool, setGhoPool] = useState<any>();

    const { provider, safeSDKKit, selectedSafe } = useAuth();
    const signer = provider?.getSigner();

    console.log(signer, safeSDKKit, selectedSafe, "signer");

    const borrowGho = async () => {
        if (provider && signer && safeSDKKit) {

            const address = await signer?.getAddress();
            // setAddress(address);

            const pool = new PoolBundle(provider, {
                POOL: AaveV3GoerliGho.POOL,
            });

            console.log("pool", pool);
            const borrowTx = pool.borrowTxBuilder.generateTxData({
                user: selectedSafe || "",
                reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",
                amount: parseUnits("0.01", 18).toString(),
                interestRateMode: InterestRate.Variable,
            });
            console.log("Borrow Tx", borrowTx);

            const intValue = parseInt(borrowTx.gasLimit.toString());

            console.log("Gas limit", intValue);


            const safeTransactionData = {
                to: borrowTx.to,
                value: parseUnits("0.01", 18).toString(),
                data: borrowTx.data,
                gasPrice: borrowTx.gasLimit
            }

            const safeTransaction = await safeSDKKit.createTransaction({ safeTransactionData });
            console.log("safeTransaction", safeTransaction);

            const tx = await safeSDKKit.signTransaction(safeTransaction);

            console.log("tx", tx);

            const txResult = await safeSDKKit.executeTransaction(tx);

            console.log("txResult", txResult)



            //TODO @abhishek-01k 
            // signer
            //     .sendTransaction(borrowTx)
            //     .then((txResponse) => {
            //         setTxStatus(`Tx submitted with hash ${txResponse.hash}`);
            //         return txResponse.wait(); // Wait for the transaction to be confirmed
            //     })
            //     .then((txReceipt) => {
            //         setTxStatus(`Tx confirmed with hash ${txReceipt.transactionHash}`);
            //     })
            //     .catch((error) => {
            //         setTxStatus(`Tx failed :( with error ${error.toString()}`);
            //     });
        }
    };

    const supplyasset = async () => {

        const pool = new PoolBundle(provider, {
            POOL: AaveV3GoerliGho.POOL,
        });

        const supply = await pool.supplyTxBuilder.generateTxData({
            user: selectedSafe || "",
            reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",
            amount: '10',
            onBehalfOf: selectedSafe,
        });

        console.log("Supply", supply);

        const safeTransaction = await safeSDKKit.createTransaction({
            supply
        });
        console.log("safeTransaction", safeTransaction);

        const data = supply.data;

        const tx = await safeSDKKit.signTransaction(safeTransaction);

        console.log("tx", tx);
    }

    const repayasset = async () => {

        const pool = new PoolBundle(provider, {
            POOL: AaveV3GoerliGho.POOL,
        });

        const repay = await pool.repayTxBuilder.generateTxData({
            user: selectedSafe || "",
            reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",
            amount: '10',
            onBehalfOf: selectedSafe,
            interestRateMode: InterestRate.Variable,
            // onBehalfOf?: tEthereumAddress;
            // useOptimizedPath?: boolean;
        });

        console.log("repay", repay);
    }


    return (
        <main>
            <h1>GHO Demo</h1>
            {address && <h3>Address: {address}</h3>}
            {txStatus && <p>Status: {txStatus}</p>}
            <div className="flex flex-row gap-4">
                <button className={buttonVariants()} onClick={borrowGho}>Mint GHO</button>
                <button className={buttonVariants()} onClick={supplyasset}>Supply </button>
                <button className={buttonVariants()} onClick={repayasset}>Repay</button>
            </div>
        </main>
    );
};

export default Interact;