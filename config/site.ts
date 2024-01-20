export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Paywithgho",
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    // {
    //   title: "Interact",
    //   href: "/interact"
    // },
    {
      title: "Widget",
      href: "/widget"
    },
    {
      title: "Pay with IBAN",
      href: "/pay"
    }
  ],
  links: {
    github: "https://github.com/kamalbuilds/paywithgho",
    docs: "https://ui.shadcn.com",
  },
}
