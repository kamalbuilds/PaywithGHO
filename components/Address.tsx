import useMemoizedAddressLabel from '@/hooks/useMemoizedAddressLabel';
import React from 'react';
import { MdOpenInNew } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";
import { ImNewTab } from "react-icons/im";
import Link from 'next/link';

const Address = ({
    address,
    isTransactionAddress,
    showBlockExplorerLink,
    useFullAddress = false,
    showCopyIntoClipboardButton = true
}: any) => {

    const addressLabel = useMemoizedAddressLabel(address);
    const blockExplorerLink = `https://sepolia.etherscan.io/${isTransactionAddress ? 'tx' : 'address'
        }/${address}`

    return (
        <div className='flex flex-row gap-1 items-center'>
            <span>{useFullAddress ? address : addressLabel}</span>
            {showBlockExplorerLink && blockExplorerLink && (
                <Link target='_blank' href={blockExplorerLink}><MdOpenInNew /></Link>
            )}

            {showCopyIntoClipboardButton && (
                <div onClick={() => navigator?.clipboard?.writeText?.(address)}>
                    <AiOutlineCopy />
                </div>)}

            {/* {enableTransaction && (
                <Link href={`/transactions/${address}`}>
                    {<ImNewTab />}
                </Link>

            )} */}

        </div>
    );
};

export default Address;