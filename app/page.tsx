"use client";

import { Streamgho } from "@/components/Streamgho"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Stream Payments using <br className="hidden sm:inline" />
          GHO seamlessly.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Wrap your GHO tokens <img src="https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/gho/icon.svg" alt="gho token" /> into Super GHO tokens and stream them to your recipients.
        </p>
      </div>
      <Streamgho />
    </section>
  )
}
