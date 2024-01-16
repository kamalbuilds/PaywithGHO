import { useState, useEffect } from 'react'
import { AuthContext, OrderState } from '@monerium/sdk'

type ConnectedProps = {
    authContext: AuthContext
    orderState: OrderState | undefined
    safe: string
    onLogout: () => void
    onTransfer: (iban: string, amount: string) => void
}

function Connected({ authContext, orderState, safe, onLogout, onTransfer }: ConnectedProps) {
    const [counterpartIban, setCounterpartIban] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (orderState === OrderState.processed || orderState === OrderState.rejected) {
            setCounterpartIban('')
            setTimeout(() => {
                setIsLoading(false)
            }, 5000)
        }
    }, [orderState])

    return (
        <>
            <p>Email: {authContext.email}</p>
            <p>User Id: {authContext.userId}</p>
            <p>Default profile: {authContext.defaultProfile}</p>

            {isLoading ? (
                <div >
                    {orderState && (
                        <>
                            {orderState === OrderState.placed && <div >Order placed</div>}
                            {orderState === OrderState.pending && <div >Order pending</div>}
                            {orderState === OrderState.rejected && <div >Order rejected</div>}
                            {orderState === OrderState.processed && (
                                <div>Order processed</div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <>
                    <input
                        value={counterpartIban}
                        onChange={(e) => setCounterpartIban(e.target.value)}
                        placeholder="Enter the recipient's IBAN"
                        className='rounded-md w-[360px] text-black h-[40px] px-2 py-1'
                    />

                    <br />

                    {counterpartIban && safe && (
                        <>
                            <div >{`You are going to transfer 1 EUR from ${safe} to ${counterpartIban}`}</div>

                            <button
                                onClick={() => {
                                    onTransfer(counterpartIban, '1')
                                    setIsLoading(true)
                                }}

                            >
                                Transfer
                            </button>
                        </>
                    )}

                    {/* <button
                        onClick={() => {
                            onTransfer(counterpartIban, '1')
                            setIsLoading(true)
                        }}

                    >
                        Transfer
                    </button> */}

                    <br />

                    <button color="error" onClick={onLogout}>
                        Logout from Monerium
                    </button>
                </>
            )}
        </>
    )
}

export default Connected;
