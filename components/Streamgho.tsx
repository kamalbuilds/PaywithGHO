import { useMemo } from "react"
import superTokenList from "@superfluid-finance/tokenlist"
import SuperfluidWidget, {
  PaymentOption,
  WalletManager,
  WidgetProps,
} from "@superfluid-finance/widget"
import { useModal } from "connectkit"

export function Streamgho() {
  const { open, setOpen } = useModal()

  const walletManager = useMemo<WalletManager>(
    () => ({
      isOpen: open,
      open: () => setOpen(true),
    }),
    [open, setOpen]
  )

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
            address: "0x30a6933Ca9230361972E413a15dC8114c952414e",
          },
        },
      ],
    },
    type: "page",
  }

  return (
    <SuperfluidWidget
      {...data}
      tokenList={superTokenList}
      type="dialog"
      walletManager={walletManager}
    >
      {({ openModal }) => (
        <button onClick={() => openModal()}>Open Superfluid Widget</button>
      )}
    </SuperfluidWidget>
  )
}
