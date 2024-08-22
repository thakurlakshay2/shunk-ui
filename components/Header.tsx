"use client"; 

import Link from "next/link";
import { IoWallet } from "react-icons/io5";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-70 backdrop-blur-lg rounded-full shadow-md w-[33vw]">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link href="/">
              <span className="font-silkscreen text-3xl">Shunk</span>
            </Link>
          </div>
          <div>
            <div className="cursor-pointer">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <IoWallet size={"32px"} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
