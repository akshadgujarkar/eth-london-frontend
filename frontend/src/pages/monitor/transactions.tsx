import { Inter } from "next/font/google";
import Head from "next/head";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { baseUrl } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Monitor() {
  const emailRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const txns: {
    hash: string;
    value: string;
    blockNumber: number;
  }[] = [
    {
      hash: "0x1234",
      value: "0.01",
      blockNumber: 1234,
    },
    {
      hash: "0x12345",
      value: "0.01",
      blockNumber: 1234,
    },
  ];

  async function onClick() {
    const email = emailRef.current?.value;
    const time = timeRef.current?.value;

    // TODO: Add Toast
    if (!email || !time) {
      return;
    }

    try {
      console.log(email, time);

      //   TODO: Fix endpoint url
      const res = await baseUrl.post("/schedule", {
        transactionId: "0x1234",
        duration: time,
        email: email,
      });

      // TODO: Close Dialog
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>Your Transactions</title>
      </Head>
      <DashboardLayout loading={false}>
        <Dialog>
          <DashboardShell>
            <DashboardHeader
              heading="Your Transactions"
              text="View your transactions and set custom email alerts"
            >
              <Button variant="outline">
                <Icons.refresh className="mr-2 h-4 w-4" />
                Fetch Latest
              </Button>
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
                {txns.map(({ hash, blockNumber, value }) => (
                  <TableRow key={hash}>
                    <TableCell className="font-medium">{hash}</TableCell>
                    <TableCell>{blockNumber}</TableCell>
                    <TableCell>{value}</TableCell>
                    <TableCell className="text-right">
                      <DialogTrigger
                        className="mr-2"
                        onClick={() => {
                          console.log(hash);
                        }}
                      >
                        <Button className="rounded-full">
                          <Icons.edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DashboardShell>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Alert</DialogTitle>
              <DialogDescription>
                Mention the email you would like to recieve alerts on.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue="prathamesh.22120160@viit.ac.in"
                  className="col-span-3"
                  ref={emailRef}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time (sec)
                </Label>
                <Input
                  id="time"
                  defaultValue="10"
                  className="col-span-3"
                  type="number"
                  ref={timeRef}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" onClick={onClick}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
}
