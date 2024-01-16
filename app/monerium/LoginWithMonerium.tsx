
type LoginWithMoneriumProps = {
    safe: string
    threshold: string
    onLogin: () => void
}

function LoginWithMonerium({ safe, threshold, onLogin }: LoginWithMoneriumProps) {
    return (
        <>
            <div >
                Connected !!
            </div>
            <div>
                You are connected and have selected the following Safe:{' '}
                <div>
                    {safe} ({threshold})
                </div>
            </div>
            <div >
                You now can login with Monerium and link the selected Safe with your account
            </div>
            <br />
            <button onClick={onLogin}>
                Login with Monerium
            </button>
        </>
    )
}

export default LoginWithMonerium