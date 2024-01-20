import { buttonVariants } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

interface Balance {
  address: string;
  chain: string;
  network: string;
  balances: { currency: string; amount: string }[];
}

interface UserBalanceProps {
  closeMoneriumFlow: () => void;
  balances: Balance[] | undefined; // Define the type here
}

const UserBalance: React.FC<UserBalanceProps> = ({ closeMoneriumFlow, balances }) => {
  const { selectedSafe } = useAuth();

  const balancesOfUser = balances?.filter((balance) => {
    return balance.address.toLowerCase() === selectedSafe.toLowerCase();
  });

  return (
    <div className='flex flex-col gap-16 justify-between my-12'>
      <div className='flex gap-8 flex-col'>
        <div className='text-3xl font-500 leading-tight tracking-tighter'>User Balance</div>
        <div>
          {balancesOfUser?.map((balance, index) => {
            return (
              <div key={index} className='flex gap-4'>
                <div className='flex gap-1 text-xl capitalize'>
                  <div>{balance.chain}</div>
                  <div>{balance.network}</div>
                </div>
                <div className='text-lg text-gray-500'>
                  {balance.balances.map((item) => {
                    return (
                      <div key={`${item.currency}-${item.amount}`} className='flex gap-1'>
                        <div className='uppercase'>{item.currency}</div>
                        <div>{item.amount}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex justify-start my-4'>
        <button className={buttonVariants()} onClick={closeMoneriumFlow}>
          Log Out Memorium
        </button>
      </div>
    </div>
  );
};

export default UserBalance;
