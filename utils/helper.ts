import { Pool } from '@aave/contract-helpers';
import { EthereumTransactionTypeExtended } from '@aave/contract-helpers';
import { BigNumber, providers } from 'ethers';
import { ethers } from 'ethers';

const pool = new Pool(provider, {
  POOL: poolAddress,
  WETH_GATEWAY: wethGatewayAddress,
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

