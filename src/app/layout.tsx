import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {clsx} from "clsx";
import { Roboto } from "next/font/google"; // P2dda

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] }); // P2dda

export const metadata: Metadata = {
  title: "ATLAS",
  description: "ATLAS - AI-powered Earth intelligence platform by QCX",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(roboto.className, "antialiased")}> // P79ee
      {children}
      </body>
    </html>
  );
}
