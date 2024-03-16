import { MarketingConfig } from "~/types";

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Force Inclusion",
      href: "/force-inclusion",
    },
    {
      title: "Monitor",
      href: "/monitor",
    },
    {
      title: "GitHub",
      href: "/github",
      disabled: true,
    },
    {
      title: "Documentation",
      href: "/docs",
      disabled: true,
    },
  ],
};
