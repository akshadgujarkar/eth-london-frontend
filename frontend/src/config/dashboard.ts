import { DashboardConfig } from "~/types";

export const dashboardConfig: DashboardConfig = {
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
      title: "Dashboard",
      href: "/dashboard/lister/stats",
      icon: "home",
    },

    {
      title: "My Contracts",
      href: "/dashboard/lister",
      icon: "users",
    },
    {
      title: "Create Contract",
      href: "/dashboard/lister/contract/add",
      icon: "package",
    },
  ],
};
