import { buttonVariants } from "@/components/ui/button"

type LoginWithMoneriumProps = {
    safe: string
    threshold: string
    onLogin: () => void
}

function LoginWithMonerium({ safe, threshold, onLogin }: LoginWithMoneriumProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div >
                Safe wallet Connected !!
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
            <button onClick={onLogin} className={buttonVariants()} >
                Login with Monerium
            </button>
        </div>
    )
}

export default LoginWithMonerium