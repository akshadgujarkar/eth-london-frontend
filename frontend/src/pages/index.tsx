import { Inter } from "next/font/google";
import Head from "next/head";
import MainLayout from "@/components/layouts/main-layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <MainLayout>
        <section className="p-4">
          <div className="bg-[#8594B3] bg-[url('/images/bg.png')] h-[80vh] rounded-lg p-8">
            Meow
          </div>
        </section>
      </MainLayout>
    </>
  );
}