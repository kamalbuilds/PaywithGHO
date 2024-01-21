// @ts-nocheck
"use client";

import type { NextPage } from "next";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { InterestRate, Pool, PoolBundle } from "@aave/contract-helpers";
import { AaveV3Ethereum , AaveV3Sepolia } from "@bgd-labs/aave-address-book";
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
import AssetBalance from "@/components/AssetBalance";

const Interact: NextPage = () => {

  const [userDetails, setUserDetails] = useState<any>();

  const { provider, safeSDKKit, selectedSafe } = useAuth();
  const signer = provider?.getSigner();

  console.log(signer, safeSDKKit, selectedSafe, "signer");

  // 'reserves', 'userReserves', 'reserveIncentives', and 'userIncentives' inputs from Setup section


  // User address to fetch data for, insert address here
  const currentAccount = selectedSafe;

  // if (!provider) {
  //     // Handle the case where provider is null, e.g., throw an error or handle it appropriately
  //     throw new Error("Provider is null");
  //   }
  // View contract used to fetch all reserves data (including market base currency data), and user reserves
  // Using Aave V3 Eth Mainnet address for demo
  const poolDataProviderContract = new UiPoolDataProvider({
    uiPoolDataProviderAddress: markets.AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
    provider,
    chainId: ChainId.mainnet,
  });

  // View contract used to fetch all reserve incentives (APRs), and user incentives
  // Using Aave V3 Eth Mainnet address for demo
  const incentiveDataProviderContract = new UiIncentiveDataProvider({
    uiIncentiveDataProviderAddress:
      markets.AaveV3Ethereum.UI_INCENTIVE_DATA_PROVIDER,
    provider,
    chainId: ChainId.mainnet,
  });

  console.log("poolDataProviderContract", poolDataProviderContract, incentiveDataProviderContract, "incentiveDataProviderContract");

  async function fetchContractData() {
    // Object containing array of pool reserves and market base currency data
    // { reservesArray, baseCurrencyData }
    const reserves = await poolDataProviderContract.getReservesHumanized({
      lendingPoolAddressProvider: markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
    });

    // Object containing array or users aave positions and active eMode category
    // { userReserves, userEmodeCategoryId }
    const userReserves = await poolDataProviderContract.getUserReservesHumanized({
      lendingPoolAddressProvider: markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
      user: currentAccount,
    });

    // Array of incentive tokens with price feed and emission APR
    const reserveIncentives =
      await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
        lendingPoolAddressProvider:
          markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
      });

    // Dictionary of claimable user incentives
    const userIncentives =
      await incentiveDataProviderContract.getUserReservesIncentivesDataHumanized({
        lendingPoolAddressProvider:
          markets.AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
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
    setUserDetails(userSummary);
  }

  useEffect(() => {
    if (provider) {
      fetchContractData();
    }
  }, [provider])

  return (
    <main>
      <h1 className='text-4xl font-[700] text-center my-8'>Supply or Borrow from your Safe Wallet</h1>
      {/* {address && <h3>Address: {address}</h3>}
      {txStatus && <p>Status: {txStatus}</p>}
      <div className="flex flex-row gap-4">
        <button className={buttonVariants()} onClick={borrowGho}>Mint GHO</button>
        <button className={buttonVariants()} onClick={supplyasset}>Supply </button>
        <button className={buttonVariants()} onClick={repayasset}>Repay</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchContractData}>Fetch Data</button>
      </div> */}

      {userDetails && <AssetBalance userDetails={userDetails} />}

      <div className="flex flex-row gap-4 mx-8">
        <SupplyCard />
        <BorrowCard />
      </div>


    </main>
  );
};

export default Interact;