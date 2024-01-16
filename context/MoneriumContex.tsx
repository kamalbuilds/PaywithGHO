"use client"
import { createContext } from "react";

type MoneriumContextProviderProps = {
    children: React.ReactNode
}

export const MoneriumContext = createContext({});

const MoneriumContextProvider = ({ children }: MoneriumContextProviderProps) => {


    return (
        <MoneriumContext.Provider
            value={{}}
        >
            {children}
        </MoneriumContext.Provider>
    )

}

export default MoneriumContextProvider