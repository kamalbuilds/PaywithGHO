"use client"
import React from 'react';
import { Eip1193Provider, SupportedChainId, SwapWidget, darkTheme, lightTheme, Theme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { useAuth } from '@/context/AuthContext';
import { TOKEN_LIST } from '@/config/tokenList';
import { Web3Provider } from "@ethersproject/providers";
import { useTheme } from 'next-themes';


const WidgetPage = () => {

    const { setTheme, theme } = useTheme()
    const { provider } = useAuth();

    return (
        <div className='flex flex-col justify-center items-center mt-20'>
            <SwapWidget
                width={500}
                provider={provider}
                tokenList={TOKEN_LIST}
                defaultOutputTokenAddress={'0x83B844180f66Bbc3BE2E97C6179035AF91c4Cce8'}
                theme={theme === "dark" ? darkTheme : lightTheme}
            />
        </div>
    );
};

export default WidgetPage;