import { DashboardConfig } from "~/types";

export const monitorConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Force Inclusion",
      href: "/force-inclusion",
    },
    {
      title: "Monitor",
      href: "/monitor",
    },
  ],
  sidebarNav: [
    {
      title: "Overview",
      href: "/monitor",
      icon: "home",
    },
    {
      title: "Transactions",
      href: "/monitor/transactions",
      icon: "users",
    },
    {
      title: "Sequencer",
      href: "/monitor/sequencer",
      icon: "users",
    },
    {
      title: "Alerts",
      href: "/monitor/alerts",
      icon: "users",
    },
  ],
};
