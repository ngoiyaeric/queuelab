import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"
import IntercomMessenger from '@/components/IntercomMessenger';
import { DynamicBackground } from '@/components/dynamic-background';

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument-serif" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.queue.cx'),
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
      <body className={clsx(inter.className, roboto.className, instrumentSerif.variable, "antialiased")}>
        <ClerkProvider
          dynamic
          appearance={{
            variables: {
              colorPrimary: 'hsl(120, 15%, 25%)',
              colorBackground: 'hsl(30, 20%, 98%)',
              colorText: 'hsl(20, 10%, 10%)',
              borderRadius: '0.75rem',
            },
            elements: {
              card: 'shadow-xl border border-border',
              navbar: 'hidden',
            }
          }}
        >
          <DynamicBackground />
          {children}
          <IntercomMessenger />
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}
