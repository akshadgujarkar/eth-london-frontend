import { Inter } from "next/font/google";
import Head from "next/head";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const inter = Inter({ subsets: ["latin"] });

export default function Monitor() {
  const alerts: {
    hash: string;
    value: string;
    blockNumber: number;
  }[] = [
    {
      hash: "0x1234",
      value: "0.01",
      blockNumber: 1234,
    },
  ];

  return (
    <>
      <Head>
        <title>Arbitrum & Orbit Monitor</title>
      </Head>
      <DashboardLayout loading={false}>
        <DashboardShell>
          <DashboardHeader
            heading="Your Alerts"
            text="View and manage your alerts."
          >
            <Link href="#">
              <Button variant="outline">
                <Icons.add className="mr-2 h-4 w-4" />
                Create Contract
              </Button>
            </Link>
          </DashboardHeader>

          <Table>
            <TableCaption>Your email alerts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Block Number</TableHead>
                <TableHead>Value</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {alerts.map(({ hash, blockNumber, value }) => (
                <TableRow key={hash}>
                  <TableCell className="font-medium">{hash}</TableCell>
                  <TableCell>{blockNumber}</TableCell>
                  <TableCell>{value}</TableCell>
                  <TableCell className="text-right">
                    <Link href={"#"} className="mr-2">
                      <Button className="rounded-full">
                        <Icons.info className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DashboardShell>
      </DashboardLayout>
    </>
  );
}
