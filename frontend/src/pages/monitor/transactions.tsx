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
import { useEffect, useRef, useState } from "react";
import { baseUrl } from "@/lib/utils";
import {
  ArbiscanTxn,
  getBalances,
  getTxnStatus,
  getTxns,
} from "@/lib/arbiscan";

const inter = Inter({ subsets: ["latin"] });

export default function Monitor() {
  const emailRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const [transactions, setTransactions] = useState<ArbiscanTxn[]>([]);
  const [activeTxn, setActiveTxn] = useState(
    "0xb840b43d46990a4eebc7b46d5df7b1fa578e4dab3a99601e9759bce7537b811e"
  );

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
        transactionId:
          "0xb840b43d46990a4eebc7b46d5df7b1fa578e4dab3a99601e9759bce7537b811e",
        duration: time,
        email: email,
      });

      // TODO: Close Dialog
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await getTxns({
          address: "0x375c11fd30fdc95e10aad66bdce590e1bccc6afa",
          type: "txlist",
        });

        setTransactions(res.result);

        // const _ = await getBalances([
        //   "0x375C11FD30FdC95e10aAD66bdcE590E1bccc6aFA",
        //   "0xF27552275B91e436Af383266262a37fCEf017B19",
        //   "0x2836eC28C32E232280F984d3980BA4e05d6BF68f",
        //   "0x2e1d90501C3173367ecC6a409Fb1b588Bf3C16A5",
        // ]);

        // const __ = await getTxnStatus({
        //   hash: "0xbd3856d4dac7ba6c46382f8369b5b5abf9fbdd7f3168d752a5df6ca51bc72625",
        //   type: "tx",
        // });
        // console.log(__);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

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
                {transactions.map(({ hash, blockNumber, value }) => (
                  <TableRow key={hash}>
                    <TableCell className="font-medium">{`${hash.slice(
                      0,
                      15
                    )}...`}</TableCell>
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
                          <Icons.edit
                            className="h-4 w-4"
                            onClick={(e) => {
                              setActiveTxn(hash);
                            }}
                          />
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
