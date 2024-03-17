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
export const etherscanUrl = `https://api-sepolia.etherscan.io/api?`;

export const getTxns = async ({
  address,
  type = "txlist",
}: {
  address: string;
  type: "txlistinternal" | "txlist";
}) => {
  const url = `${etherscanUrl}module=account&action=${type}&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`;

  const res = await axios.get(url);
  const data = await res.data;

  return data as {
    status: string;
    message: string;
    result: ArbiscanTxn[];
  };
};

export const getBalances = async (addresses: string[]) => {
  const url = `${etherscanUrl}module=account&action=balancemulti&address=${addresses.join(
    ","
  )}&apikey=${process.env.ETHERSCAN_API_KEY}`;

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
  const url = `${etherscanUrl}module=transaction&action=${
    type === "contract" ? "getstatus" : "gettxreceiptstatus"
  }&txhash=${hash}&apikey=${process.env.ETHERSCAN_API_KEY}`;

  const res = await axios.get(url);
  const data = await res.data;

  return data as {
    status: string;
    message: string;
    result: { status: "0" | "1" };
  };
};
