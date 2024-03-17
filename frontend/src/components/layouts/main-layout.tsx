import React from "react";

import { marketingConfig } from "@/config/marketing";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

import { useConnect, useAddress, defaultWallets } from "@thirdweb-dev/react";
import Link from "next/link";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const connect = useConnect();
  const address = useAddress();

  const [color, setcolor] = useState(false);

  async function handleConnect() {
    try {
      const wallet = await connect(defaultWallets[0], {});

      console.log("connected to", wallet);
    } catch (e) {
      console.error("failed to connect", e);
    }
  }

  const changeNavBg = () => {
    window.scrollY >= 90 ? setcolor(true) : setcolor(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);

    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

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
            <Link href="/pay">
              <Button variant="secondary" className="mr-4">
                Pay
              </Button>
            </Link>

            <Button onClick={handleConnect} className="max-w-32">
              {address ? `${address.slice(0, 10)}...` : "Connect Wallet"}
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
};

export default MainLayout;
