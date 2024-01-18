import { Pool } from '@aave/contract-helpers';
import { EthereumTransactionTypeExtended } from '@aave/contract-helpers';
import { BigNumber, providers } from 'ethers';
import { ethers } from 'ethers';
import { InterestRate, PoolBundle } from "@aave/contract-helpers";
import { AaveV3GoerliGho } from "@bgd-labs/aave-address-book";

// const pool = new Pool(provider, {
//   POOL: AaveV3GoerliGho.POOL_ADDRESSES_PROVIDER,
//   WETH_GATEWAY: wethGatewayAddress,
// });


  const pool = new PoolBundle(provider, {
    POOL: AaveV3GoerliGho.POOL,
  });


const txs: EthereumTransactionTypeExtended[] = await pool.supply({
    user,
    reserve,
    amount,
    onBehalfOf,
  });


function submitTransaction({
    provider: ethers.providers.provider,  // Signing transactions requires a wallet provider
    tx: EthereumTransactionTypeExtended
    }){
    const extendedTxData = await tx.tx();
    const { from, ...txData } = extendedTxData;
    const signer = provider.getSigner(from);
    const txResponse = await signer.sendTransaction({
        ...txData,
        value: txData.value ? BigNumber.from(txData.value) : undefined,
    });
}

