import axios from 'axios';

interface EthBalanceResponse {
  jsonrpc: string;
  id: number;
  result: string;
}

async function getEthBalance( address: string): Promise<string> {
  try {
    const response = await axios.post<EthBalanceResponse>("http://localhost:85452", {
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [address, "latest"],
      id: 1,
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching balance: Status code ${response.status}`);
    }

    const balance = response.data.result;
    return balance;
  } catch (error) {
    throw error; // Re-throw the error for handling in the calling code
  }
}

async function eth_blockNumber( address: string): Promise<string> {
    try {
      const response = await axios.post<EthBalanceResponse>("http://localhost:85452", {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        id: 1,
      });
  
      if (response.status !== 200) {
        throw new Error(`Error fetching balance: Status code ${response.status}`);
      }
  
      const balance = response.data.result;
      return balance;
    } catch (error) {
      throw error; // Re-throw the error for handling in the calling code
    }
  }