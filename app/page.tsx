"use client";

import { Streamgho } from "@/components/Streamgho"
import BorrowCard from "@/components/payments/BorrowCard";
import RepayCard from "@/components/payments/RepayCard";
import SupplyCard from "@/components/payments/SupplyCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import gho from "../lib/gho.png";

export default function IndexPage() {
  const { logIn, isLoggedIn, data } = useAuth();
  return (
    <>
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-col items-center justify-center mt-16">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Welcome to <span className="text-purple-500"> PAYWithGHO </span>
          </h1>
          <img
            src="../lib/gho.png"
            className="right-0"
            alt="gho"
            width={150}
            height={150}
          />
          <div className="flex flex-col gap-4 mt-8">
            <p className="max-w-[700px] text-lg text-muted-foreground">
              One stop solution where you can borrow, swap and cash out your tokens.
            </p>

            <p className="max-w-[700px] text-lg text-muted-foreground">
              Create your account using your Email Id. And Cash out using IBAN
            </p>

            <p className="max-w-[700px] text-lg text-muted-foreground">
              🫣 You can wrap and stream GHO tokens aevery minute to your recipients
            </p>
          </div>
        </div>
      <div className="flex mt-12 gap-4 flex-col md:flex-row w-[100%] justify-center">
            <Streamgho />
            {!isLoggedIn ? (
              <Button onClick={logIn}>Sign In with Google</Button>
            ) : (
              <Link href="/interact">
                <Button>Supply/Borrow</Button>
              </Link>
            )}
          </div>
        </div>



      {isLoggedIn && <div className="mt-8">
        <div className="flex flex-row gap-4 mx-4">
          <BorrowCard />
          <SupplyCard />
          <RepayCard />
        </div>
      </div>}


    </section>
    </>
  )
}
