import axios from "axios";

export type ArbiscanTxn = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};

export const arbiscanUrl = `https://api-sepolia.arbiscan.io/api?`;

export const constructArbiscanUrl = ({}: {}) => {
  return `${arbiscanUrl}`;
};

export const getTxns = async ({
  address,
  type = "txlist",
}: {
  address: string;
  type: "txlistinternal" | "txlist";
}) => {
  const url = `${arbiscanUrl}module=account&action=${type}&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ARBISCAN_API_KEY}`;

  const res = await axios.get(url);
  const data = await res.data;

  return data as {
    status: string;
    message: string;
    result: ArbiscanTxn[];
  };
};

export const getBalances = async (addresses: string[]) => {
  const url = `${arbiscanUrl}module=account&action=balancemulti&address=${addresses.join(
    ","
  )}&apikey=${process.env.ARBISCAN_API_KEY}`;

  const res = await axios.get(url);
  const data = await res.data;

  return data as {
    status: string;
    message: string;
    result: {
      account: string;
      balance: string;
    }[];
  };
};

export const getTxnStatus = async ({
  hash,
  type,
}: {
  hash: string;
  type: "contract" | "tx";
}) => {
  const url = `${arbiscanUrl}module=transaction&action=${
    type === "contract" ? "getstatus" : "gettxreceiptstatus"
  }&txhash=${hash}&apikey=${process.env.ARBISCAN_API_KEY}`;

  const res = await axios.get(url);
  const data = await res.data;

  return data as {
    status: string;
    message: string;
    result: { status: "0" | "1" };
  };
};
