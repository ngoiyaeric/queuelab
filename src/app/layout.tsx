import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Roboto } from "next/font/google";
import { AuthProvider } from '@/components/auth-provider'; // Added import
import { Analytics } from "@vercel/analytics/react"
import IntercomMessenger from '@/components/IntercomMessenger';

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Artificial General Intelligence",
  description: "QCX - Quality Computers Experience",
  openGraph: {
    title: "Artificial General Intelligence",
    description: "QCX - Quality Computers Experience",
    images: "/opengraph-image.jpg", // Relative path to the image
    url: "https://www.queue.cx", // Updated to queue.cx
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

      </head>
      <body className={clsx(inter.className, roboto.className, "antialiased")}>
        <AuthProvider> {/* Added AuthProvider wrapper */}
          {children}
          <IntercomMessenger />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
