import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MCS Agent - Modular Code Security",
  description: "Secure your code with MCS Agent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider
          activeChain={Mumbai}
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        >
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
