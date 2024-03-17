import { Inter } from "next/font/google";
import Head from "next/head";
import MainLayout from "@/components/layouts/main-layout";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <MainLayout>
        <section className="p-4">
          <div
            className={cn(
              " h-[75vh] rounded-lg p-8",
              "flex flex-col items-center justify-center text-center"
              // "bg-[#8594B3] bg-[url('/images/bg.png')]"
            )}
          >
            <h1 className="text-5xl font-bold">
              Making Developer Experience <br /> Easy on{" "}
              <span className="text-blue-400 text-6xl">Arbitrum</span>
              <br />
              <span className="4xl">#</span>TeamQuasar
            </h1>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
