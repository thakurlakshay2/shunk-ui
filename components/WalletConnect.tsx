"use client"
import { ConnectWallet, useAddress, useConnect } from "@thirdweb-dev/react";

export default function WalletConnect() {
  const address = useAddress();
  const connectWithMetamask = useConnect();

  return (
    <div className="flex justify-center items-center h-screen">
      {address ? (
        <p className="text-center">Connected: {address}</p>
      ) : (
        <ConnectWallet theme={"dark"}/>
      )}
    </div>
  );
}
