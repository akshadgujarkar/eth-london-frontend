import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <ThirdwebProvider
        activeChain="arbitrum-sepolia"
        clientId={process.env.THIRD_WEB_CLIENT_ID}
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
          walletConnect(),
        ]}
      >
        <Component {...pageProps} />
        <Toaster />
      </ThirdwebProvider>
    </ThemeProvider>
  );
}
