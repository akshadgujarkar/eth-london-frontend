import { Inter } from "next/font/google";
import Head from "next/head";
import MainLayout from "@/components/layouts/main-layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Force Inclusion</title>
      </Head>
      <MainLayout>
        <h1>Hi</h1>
      </MainLayout>
    </>
  );
}
