"use client";

import { oneInchList } from "@/actions/createForm";
import { CreateForm } from "@/components/CreateForm";
import Header from "@/components/Header";
import Watchlist from "@/components/Watchlist";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    oneInchList();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-8">
      <Header />
      {/* <Watchlist /> */}
      <CreateForm />
    </main>
  );
}
