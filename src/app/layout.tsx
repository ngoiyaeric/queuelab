import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {clsx} from "clsx";
import { Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "QCX",
  description: "QCX - AI-powered Location Intelligence platform by QCX",
  openGraph: {
    images: ["/src/app/icon.png"]
  }
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, roboto.className, "antialiased")}>
      {children}
      </body>
    </html>
  );
}
