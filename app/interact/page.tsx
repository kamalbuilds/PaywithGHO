// @ts-nocheck
"use client";

import type { NextPage } from "next";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useState } from "react";
import { InterestRate, Pool, PoolBundle } from "@aave/contract-helpers";
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book";
import { AuthContextProvider, useAuth } from '@/context/AuthContext';
import { buttonVariants } from "@/components/ui/button";
import { toast } from "react-toastify";
import BorrowCard from "@/components/payments/BorrowCard";
import SupplyCard from "@/components/payments/SupplyCard";
import { formatUserSummaryAndIncentives } from '@aave/math-utils';
import dayjs from 'dayjs';
import {
  UiPoolDataProvider,
  UiIncentiveDataProvider,
  ChainId,
} from '@aave/contract-helpers';
import * as markets from '@bgd-labs/aave-address-book';
import { formatReserves } from '@aave/math-utils';

const Interact: NextPage = () => {

    const [address, setAddress] = useState<string>();
    const [txStatus, setTxStatus] = useState<string>();
    const [ghopool, setGhoPool] = useState<any>();

    const { provider, safeSDKKit, selectedSafe } = useAuth();
    const signer = provider?.getSigner();

    console.log(signer, safeSDKKit, selectedSafe, "signer");

    // 'reserves', 'userReserves', 'reserveIncentives', and 'userIncentives' inputs from Setup section

    
    // User address to fetch data for, insert address here
    const currentAccount = '0x9085fDCCeD00AEF8d15158DC1A7bf20F6A9da897';

    // View contract used to fetch all reserves data (including market base currency data), and user reserves
    // Using Aave V3 Eth Mainnet address for demo
    const poolDataProviderContract = new UiPoolDataProvider({
      uiPoolDataProviderAddress: markets.AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
      provider,
      chainId: ChainId.sepolia,
    });
    
    // View contract used to fetch all reserve incentives (APRs), and user incentives
    // Using Aave V3 Eth Mainnet address for demo
    const incentiveDataProviderContract = new UiIncentiveDataProvider({
      uiIncentiveDataProviderAddress:
        markets.AaveV3Sepolia.UI_INCENTIVE_DATA_PROVIDER,
      provider,
      chainId: ChainId.sepolia,
    });

    console.log("poolDataProviderContract", poolDataProviderContract, incentiveDataProviderContract, "incentiveDataProviderContract");
    
    async function fetchContractData() {
      // Object containing array of pool reserves and market base currency data
      // { reservesArray, baseCurrencyData }
      const reserves = await poolDataProviderContract.getReservesHumanized({
        lendingPoolAddressProvider: markets.AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
      });
    
      // Object containing array or users aave positions and active eMode category
      // { userReserves, userEmodeCategoryId }
      const userReserves = await poolDataProviderContract.getUserReservesHumanized({
        lendingPoolAddressProvider: markets.AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
        user: currentAccount,
      });
    
      // Array of incentive tokens with price feed and emission APR
      const reserveIncentives =
        await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
          lendingPoolAddressProvider:
            markets.AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
        });
    
      // Dictionary of claimable user incentives
      const userIncentives =
        await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
          lendingPoolAddressProvider:
            markets.AaveV3Sepolia.POOL_ADDRESSES_PROVIDER,
          user: currentAccount,
        });
    
      console.log({ reserves, userReserves, reserveIncentives, userIncentives });

        const reservesArray = reserves.reservesData;
        const baseCurrencyData = reserves.baseCurrencyData;
        const userReservesArray = userReserves.userReserves;

        const currentTimestamp = dayjs().unix();

        const formattedPoolReserves = formatReserves({
        reserves: reservesArray,
        currentTimestamp,
        marketReferenceCurrencyDecimals:
            baseCurrencyData.marketReferenceCurrencyDecimals,
        marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        });

        /*
        - @param `currentTimestamp` Current UNIX timestamp in seconds, Math.floor(Date.now() / 1000)
        - @param `marketReferencePriceInUsd` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.baseCurrencyData.marketReferencePriceInUsd`
        - @param `marketReferenceCurrencyDecimals` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserves.baseCurrencyData.marketReferenceCurrencyDecimals`
        - @param `userReserves` Input from [Fetching Protocol Data](#fetching-protocol-data), combination of `userReserves.userReserves` and `reserves.reservesArray`
        - @param `userEmodeCategoryId` Input from [Fetching Protocol Data](#fetching-protocol-data), `userReserves.userEmodeCategoryId`
        - @param `reserveIncentives` Input from [Fetching Protocol Data](#fetching-protocol-data), `reserveIncentives`
        - @param `userIncentives` Input from [Fetching Protocol Data](#fetching-protocol-data), `userIncentives`
        */
        const userSummary = formatUserSummaryAndIncentives({
        currentTimestamp,
        marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        marketReferenceCurrencyDecimals:
            baseCurrencyData.marketReferenceCurrencyDecimals,
        userReserves: userReservesArray,
        formattedReserves: formattedPoolReserves,
        userEmodeCategoryId: userReserves.userEmodeCategoryId,
        reserveIncentives,
        userIncentives,
        });

        console.log("userSummary", userSummary);
    }

    const borrowGho = async () => {
        if (provider && signer && safeSDKKit) {

            const address = await signer?.getAddress();
            // setAddress(address);

            const pool = new PoolBundle(provider, {
                POOL: AaveV3Sepolia.POOL,
            });

            const borrowTx = pool.borrowTxBuilder.generateTxData({
                user: selectedSafe || "",
                reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",
                amount: parseUnits("0.01", 18).toString(),
                interestRateMode: InterestRate.Variable,
            });
            console.log("Borrow Tx", borrowTx);

            const safeTransactionData = {
                to: borrowTx.to,
                value: parseUnits("0", 18).toString(),
                data: borrowTx.data,
                safeTxGas: borrowTx.gasLimit
            }

            const safeTransaction = await safeSDKKit.createTransaction({ safeTransactionData });
            console.log("safeTransaction", safeTransaction);

            const tx = await safeSDKKit.signTransaction(safeTransaction);
            console.log("tx", tx);

            const txResult = await safeSDKKit.executeTransaction(tx);
            console.log("txResult", txResult)

        }
    };

    const supplyasset = async () => {

        const pool = new PoolBundle(provider, {
            POOL: AaveV3Sepolia.POOL,
        });

        const supply = await pool.supplyTxBuilder.generateTxData({
            user: selectedSafe || "",
            reserve: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",  // dai address
            amount: '500',
            onBehalfOf: selectedSafe,
        });

        const safeTransactionData = {
            to: supply.to,
            value: parseUnits("0", 18).toString(), // ethers BigNumber
            data: supply.data,
            safeTxGas: supply.gasLimit?.toString()
        }

        console.log("Safe transaction data", safeTransactionData);

        const safeTransaction = await safeSDKKit?.createTransaction({ safeTransactionData });
        const tx = await safeSDKKit?.signTransaction(safeTransaction);
        console.log("tx", tx);

        const txResult = await safeSDKKit?.executeTransaction(tx);

        txResult ? toast.success("Successfully supplied") : toast.error("Transaction Failed");

        console.log("txResult", txResult)

    }

    const repayasset = async () => {

        const pool = new PoolBundle(provider, {
            POOL: AaveV3Sepolia.POOL,
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

        const safeTransactionData = {
            to: repay.to,
            value: parseUnits("0", 18).toString(), // ethers BigNumber
            data: repay.data,
            safeTxGas: repay.gasLimit?.toString() || "0"
        }

        const safeTransaction = await safeSDKKit?.createTransaction({ safeTransactionData });
        console.log("safeTransaction", safeTransaction);

        const tx = await safeSDKKit?.signTransaction(safeTransaction);

        console.log("tx", tx);

        const txResult = await safeSDKKit?.executeTransaction(tx);

        txResult ? toast.success("Successfully repayed ✅") : toast.error("Repayment Failed ❌");

        console.log("txResult", txResult)

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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchContractData}>Fetch Data</button>
            </div>

            <div className="flex flex-row gap-4 mx-4">
                <BorrowCard />
                <SupplyCard />
            </div>
        </main>
    );
};

export default Interact;