import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/Navbar'
import { AuthContextProvider } from '@/context/AuthContext'
import MoneriumContextProvider from '@/context/MoneriumContex'
import { WagmiConfig, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import ClientLayout from './Web3Provider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {

  const config = createConfig(
    getDefaultConfig({
      appName: 'PaywithGHO',
      //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      alchemyId:  process.env.NEXT_PUBLIC_APP_ALCHEMY_ID,
      chains: [ sepolia],
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    })
  );

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClientLayout>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <AuthContextProvider>
              <MoneriumContextProvider>
                <Navbar />
              <div className="flex-1">{children}</div>
                </MoneriumContextProvider>
                </AuthContextProvider>
            </div>
            <TailwindIndicator />
            </ClientLayout>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
