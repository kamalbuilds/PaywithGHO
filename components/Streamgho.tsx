"use client";

import { useMemo } from "react"
import superTokenList from "@superfluid-finance/tokenlist"
import SuperfluidWidget, {
  PaymentOption,
  WalletManager,
  WidgetProps,
} from "@superfluid-finance/widget"
import { useModal } from "connectkit"
import { Button } from "./ui/button";

export function Streamgho() {
  const { open, setOpen } = useModal()

  const walletManager = useMemo<WalletManager>(
    () => ({
      isOpen: open,
      open: () => setOpen(true),
    }),
    [open, setOpen]
  )

  const mytokenlist = {
    "name": "Superfluid Token List",
    "version": {
      "major": 2,
      "minor": 3,
      "patch": 0
    },
    "timestamp": "2023-10-20T08:18:44.184Z",
    "tokens": [
      {
        "address": "0x22064a21fee226d8ffb8818e7627d5ff6d0fc33a",
        "name": "Super GHO Token",
        "symbol": "GHOx",
        "decimals": 18,
        "chainId": 11155111,
        "extensions": {
          "superTokenInfo": {
            "type": "Wrapper",
            "underlyingTokenAddress": "0xc4bf5cbdabe595361438f8c6a187bdc330539c60"
          }
        },
        "logoURI": "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/gho/icon.svg",
        "tags": ["supertoken", "tier_a"]
      },

      {
        "address": "0xc4bf5cbdabe595361438f8c6a187bdc330539c60",
        "name": "GHO Token",
        "symbol": "GHO",
        "decimals": 18,
        "chainId": 11155111,
        "logoURI": "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/gho/icon.svg",
        "tags": ["underlying"]
      },

    ]
  };

  const data = {
    productDetails: {
      name: "PaywithGHO",
      description: "Stream GHO to the recipients every minute",
      imageURI:
        "blob:https://checkout-builder.superfluid.finance/37e91b8b-124a-4ee2-8902-4740e1d1f0b3",
    },
    paymentDetails: {
      paymentOptions: [
        {
          receiverAddress: "0xF26Ce9749f29E61c25d0333bCE2301CB2DFd3a22",
          chainId: 11155111,
          superToken: {
            address: "0x22064a21fee226d8ffb8818e7627d5ff6d0fc33a",
          },
        },
      ],
    },
    type: "page",
  }

  return (
    <SuperfluidWidget
      {...data}
      // @ts-ignore
      tokenList={mytokenlist}
      type="dialog"
      walletManager={walletManager}
    >
      {({ openModal }) => (
        <Button variant='outline' onClick={() => openModal()}>Stream GHO as Payments</Button>
      )}
    </SuperfluidWidget>
  )
}
