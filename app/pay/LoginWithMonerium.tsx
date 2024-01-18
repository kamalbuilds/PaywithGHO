import Address from "@/components/Address"
import { buttonVariants } from "@/components/ui/button"

type LoginWithMoneriumProps = {
    safe: string
    threshold: string
    onLogin: () => void
}

function LoginWithMonerium({ safe, threshold, onLogin }: LoginWithMoneriumProps) {
    return (
        <div className="flex flex-col items-center gap-4 mt-12">
            <div className="text-xl font-600 ">
                Safe wallet Connected !!
            </div>
            <div className="mt-4">
                You are connected and have selected the following Safe:{' '}
                <div className='border px-2 py-1 my-2 border-gray-600 rounded-md flex flex-row gap-4'>
                    <Address address={safe} showBlockExplorerLink useFullAddress /> {" "}  ({threshold})
                </div>
            </div>
            <div className="mt-4">
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