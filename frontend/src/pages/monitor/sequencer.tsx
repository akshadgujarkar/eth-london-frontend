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
import { w3cwebsocket as W3CWebSocket } from "websocket";

const inter = Inter({ subsets: ["latin"] });
type EncryptedMessages = {
  version: number;
  messages: EncryptedMessage[];
  signature: null; // Assuming signature is always null in your case
};

type EncryptedMessage = {
  sequenceNumber: number;
  message: {
    // Message can be complete or a partial message without header
    message?: {
      // Make message optional
      header?: {
        // Make header optional
        kind: number;
        sender: string;
        blockNumber: number;
        timestamp: number;
        requestId: string;
        baseFeeL1: number;
      };
      l2Msg: string;
      batchGasCost?: number;
    };
    delayedMessagesRead: number;
  };
  signature: null; // Assuming signature is always null in your case
};

export default function Monitor() {
  const emailRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const [seqData, setSeqData] = useState<EncryptedMessages>();
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
  useEffect(() => {
    const client = new W3CWebSocket("ws://127.0.0.1:9642");

    client.onopen = () => {
      console.log("WebSocket connected");
    };

    client.onmessage = (message) => {
      console.log("Received message:", message.data);

      const dataString = message.data.toString();

      try {
        const newMessage: EncryptedMessages = JSON.parse(dataString);
        setSeqData(newMessage);
        console.log("done parsing");
        console.log(seqData);
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    return () => {
      client.close();
    };
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
                  <TableHead>Block Number</TableHead>
                  <TableHead>sender</TableHead>
                  <TableHead>timestamp</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              {seqData && (
                <TableBody>
                  {seqData.messages.map((encodedMessageList) => {
                    // Assert message to have a value (assuming it usually does)
                    const message = encodedMessageList.message as {
                      message: { header?: any };
                    };
                    return (
                      <TableRow key={message?.message?.header?.blockNumber}>
                        {" "}
                        {/* Use blockNumber as unique key */}
                        <TableCell>
                          {message?.message?.header?.blockNumber}
                        </TableCell>
                        <TableCell>
                          {message?.message?.header?.sender}
                        </TableCell>
                        <TableCell>
                          {message?.message?.header?.timestamp
                            ? new Date(
                                message?.message?.header?.timestamp * 1000
                              ).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {/* Add any actions you want here, like buttons or links */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
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
