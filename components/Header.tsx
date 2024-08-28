"use client";

import Link from "next/link";
import { IoWallet } from "react-icons/io5";
import WalletConnect from "./WalletConnect";
import { useNetworkMismatch } from "@thirdweb-dev/react";


export default function Header() {
  const isMismatch = useNetworkMismatch();
  return (
    <header className={`sticky top-0 z-50 bg-white bg-opacity-70 backdrop-blur-lg rounded-full shadow-md w-[33vw] border-2 ${isMismatch?"border-red-500":"border-green-500"}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link href="/">
              <span className="font-silkscreen text-3xl">Shunk</span>
            </Link>
          </div>
          <div>
            <div className="cursor-pointer">
              <WalletConnect />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
