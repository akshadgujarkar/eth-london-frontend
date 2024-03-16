import React from "react";

import { marketingConfig } from "@/config/marketing";
import { useEffect, useState } from "react";

import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { useRouter } from "next/router";
import { Avatar } from "@/components/ui/avatar";

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal, { Modal } from "web3modal";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Web3Provider } from "@coinbase/wallet-sdk/dist/provider/Web3Provider";
import { log } from "console";

export const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web 3 Modal Demo",
    },
  },
  walletconnect: {
    package: WalletConnect,
    options: {},
  },
};

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const [color, setcolor] = useState(false);

  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [provider, setProvider] = useState<Web3Provider>();
  const [library, setLibrary] = useState();

  const changeNavBg = () => {
    window.scrollY >= 90 ? setcolor(true) : setcolor(false);
  };

  useEffect(() => {
    const modal = new Web3Modal({
      providerOptions,
    });

    setWeb3Modal(modal);

    window.addEventListener("scroll", changeNavBg);

    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  const connectWallet = async () => {
    try {
      if (!web3Modal) return;

      const provider = await web3Modal?.connect();
      const library = new ethers.providers.Web3Provider(provider);

      setProvider(provider);
      setLibrary(library);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* fixed left-0 top-0 */}
      <header
        style={color ? { backgroundColor: "rgba(0,0,0,0.4)" } : {}}
        className="z-10 w-full backdrop-blur duration-300  ease-in"
      >
        <div className="m-auto flex h-20 items-center justify-between p-5 py-6">
          <MainNav items={marketingConfig.mainNav} />

          <nav>
            <Button onClick={connectWallet}>Connect Wallet</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
};

export default MainLayout;
