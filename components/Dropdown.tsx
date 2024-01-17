"use client"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'


export default function Dropdown({
    chains,
    handleClick,
    activeChain
}: any) {

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {activeChain ? activeChain.name : 'Select Chain'} {" "} {activeChain && activeChain.network}
                    {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute flex flex-col p-1 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {chains.map((chain : any) => (
                        /* Use the `active` state to conditionally style the active item. */
                        <Menu.Item key={chain.chainId} as={Fragment}>
                            {({ active }) => (
                                <div
                                    onClick={() => handleClick(chain)}
                                    className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                        } group flex w-full cursor-pointer items-center rounded-md px-2 py-[10px] text-md`}
                                >
                                    {chain.name} {" "} {chain.network}
                                </div>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
