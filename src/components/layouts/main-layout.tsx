import React from "react";

import { marketingConfig } from "@/config/marketing";
import { useEffect, useState } from "react";

import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { useRouter } from "next/router";
import { Avatar } from "../ui/avatar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [color, setcolor] = useState(false);

  const handleLogin = async () => {};

  const handleLogout = async () => {};

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
            <Avatar title="HI" />
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
};

export default MainLayout;
