"use client";

import { Streamgho } from "@/components/Streamgho"
import BorrowCard from "@/components/payments/BorrowCard";
import SupplyCard from "@/components/payments/SupplyCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function IndexPage() {

  const { logIn, isLoggedIn } = useAuth();
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col gap-2 items-center">
        {/* <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Stream Payments using <br className="hidden sm:inline" />
          GHO seamlessly.
        </h1> */}

        <div className="flex flex-col items-center justify-center mt-16">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Welcome to <span className="text-purple-500"> PAY_With_GHO </span>
          </h1>

          <div className="flex flex-col gap-4 mt-8">
            <p className="max-w-[700px] text-lg text-muted-foreground">
              One stop solution where you can borrow, swap and cash out your tokens.
            </p>

            <p className="max-w-[700px] text-lg text-muted-foreground">
              🫣 Additionally, You can stream GHO token at the rate that you want.
            </p>
          </div>
        </div>

        {/* <p className="max-w-[700px] text-lg text-muted-foreground">
          Wrap your GHO tokens <img src="https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/gho/icon.svg" alt="gho token" /> into Super GHO tokens and stream them to your recipients.
        </p> */}

        <div className="flex mt-12 gap-4 flex-col md:flex-row w-[100%] justify-center">
          {/* <Link href='/interact'><Button className="min-w-[250px]">Supply or Borrow</Button></Link> */}
          <Streamgho />
          {!isLoggedIn && <Button onClick={logIn}>Sign In with safe</Button>}
          {/* <Link href='/widget'><Button className="min-w-[250px]">Swap </Button></Link> */}
          {/* <Link href='/pay'> <Button className="min-w-[250px]">Cash out with IBAN</Button></Link> */}
        </div>

      </div>



      {isLoggedIn && <div className="mt-8">
        <div className="flex flex-row gap-4 mx-4">
          <BorrowCard />
          <SupplyCard />
        </div>
      </div>}







    </section>
  )
}
