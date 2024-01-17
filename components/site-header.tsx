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

  const { logIn, logOut, isLoggedIn, data, selectedSafe, setSelectedSafe } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            {isLoggedIn ? (
                <>
                    {data && <Address address={data.eoa} />}

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
