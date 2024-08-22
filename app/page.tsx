"use client";

import Header from "@/components/Header";
import Watchlist from "@/components/Watchlist";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-8">
         <Header />
         <Watchlist />
    </main>
  );
}
