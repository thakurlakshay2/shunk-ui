"use client"; // This ensures the file is treated as a Client Component

import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./globals.css";

const activeChain = "ethereum"; // Set this to your desired blockchain

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap" rel="stylesheet" />

      </head>
      <body>
        <ThirdwebProvider activeChain={activeChain}>
 
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
