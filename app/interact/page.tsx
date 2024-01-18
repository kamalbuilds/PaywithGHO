"use client";

import type { NextPage } from "next";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useState } from "react";
import { InterestRate, PoolBundle } from "@aave/contract-helpers";
import { AaveV3GoerliGho } from "@bgd-labs/aave-address-book";

const Interact: NextPage = () => {
  const [address, setAddress] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [txStatus, setTxStatus] = useState<string>();

  const connect = async () => {
    // Define a type for window.ethereum, the injected wallet provider
    type WindowWithEthereum = Window & typeof globalThis & { ethereum?: any };
    const { ethereum } = window as WindowWithEthereum;
    if (!ethereum) return;

    // Create an ethers provider from window.ethereum
    const provider = new ethers.providers.Web3Provider(ethereum);
    await ethereum.enable();

    const signer = provider.getSigner();
    const address = await signer.getAddress();

    setAddress(address);
    setProvider(provider);
    setSigner(signer);
  };

  const mintGho = async () => {
    if (provider && signer) {
      const pool = new PoolBundle(provider, {
        POOL: AaveV3GoerliGho.POOL,
      });

      const borrowTx = pool.borrowTxBuilder.generateTxData({
        user: address || "",
        reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211",
        amount: parseUnits("100", 18).toString(),
        interestRateMode: InterestRate.Variable,
      });

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

  return (
    <main>
      <h1>GHO Demo</h1>
      <button onClick={connect}>Connect</button>
      {address && <h3>Address: {address}</h3>}
      {txStatus && <p>Status: {txStatus}</p>}
      <button onClick={mintGho}>Mint GHO</button>
    </main>
  );
};

export default Interact;