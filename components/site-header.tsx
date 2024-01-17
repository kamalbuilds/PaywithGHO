"use client";
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import Address from './Address';

export function SiteHeader() {

  const { logIn, logOut, isLoggedIn, data, deployNewSafeWallet, selectedSafe, setSelectedSafe } = useAuth();

  console.log("Data", data);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {isLoggedIn && data ? (
              <>
                {/* {data && <Address address={data.eoa} />} */}

                {selectedSafe ? (
                  <>
                    <Address address={data.safes[0]} />
                  </>
                ) : (
                  <div onClick={deployNewSafeWallet} className='border px-2 py-1 my-4 border-gray-600 rounded-md'>
                    Deploy Safe
                  </div>
                )}

                <div className='border rounded-lg border-gray-600 px-2 py-1 my-4 cursor-pointer' onClick={logOut}>
                  Sign out
                </div>
              </>
            ) : (
              <>
                <div className='border rounded-lg border-gray-600 px-2 py-1 my-4 cursor-pointer' onClick={logIn}>
                  Sign in
                </div>
              </>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
