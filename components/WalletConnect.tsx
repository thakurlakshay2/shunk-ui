"use client";
import {
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import Image from "next/image";
import { IoWallet } from "react-icons/io5";
import baseIcon from "../public/baseIcon.png";
import exclamationIcon from "../public/exclamation.png";

export const BASE_CHAIN_ID = 8453;

export default function WalletConnect() {
  const address = useAddress();
  const [, switchNetwork] = useNetwork();
  const isMismatch = useNetworkMismatch();
  // console.log(isMismatch, "called");

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex gap-2">
        <div className="flex gap-2 items-center">
          <div
            className="relative"
            onClick={() => switchNetwork && switchNetwork(BASE_CHAIN_ID)}
          >
            {isMismatch ? (
              <img
                className="absolute -top-3 -right-1 h-4"
                src={exclamationIcon.src}
              />
            ) : null}
            <Image
              src={baseIcon.src}
              className="h-7 w-7 -mt-1"
              alt="baseIcon"
              width={32}
              height={32}
            />
          </div>
        </div>
        <div>
          {address ? (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          ) : (
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          )}
          <IoWallet size={"32px"} className="justify-end" />
          <div className="text-xs">{address ? address.slice(-4) : ""}</div>
          <div className="absolute top-0 right-0 !h-[32px] !w-[32px] overflow-hidden">
            <ConnectWallet
              className="!opacity-0 !h-[32px] !w-[32px]"
              theme={"light"}
              onConnect={(wallet) => {
                // console.log(wallet, "CALLED");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
