"use client";

import { CreateForm } from "@/components/CreateForm";
import Header from "@/components/Header";
import Watchlist from "@/components/Watchlist";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-8">
      <Header />
      {/* <Watchlist /> */}
      <CreateForm />
    </main>
  );
}
