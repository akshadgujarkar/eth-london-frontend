import { Inter } from "next/font/google";
import Head from "next/head";
import MainLayout from "@/components/layouts/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { RecentSales } from "@/components/monitor/recent-sales";
import { Overview } from "@/components/monitor/overview";
import DashboardLayout from "@/components/layouts/dashboard-layout";

const inter = Inter({ subsets: ["latin"] });

export default function Monitor() {
  return (
    <>
      <Head>
        <title>Arbitrum & Orbit Monitor</title>
      </Head>
      <DashboardLayout loading={false}>
        <h1>Alerts</h1>
      </DashboardLayout>
    </>
  );
}
