import { MarketingConfig } from "~/types";

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Monitor",
      href: "/monitor",
    },
    {
      title: "GitHub",
      href: "https://github.com/prathamesh-mutkure/eth-london-frontend",
      disabled: true,
    },
    {
      title: "Documentation",
      href: "/docs",
      disabled: true,
    },
  ],
};
