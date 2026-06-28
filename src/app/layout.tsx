import type { Metadata } from "next";
import { Inter, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"
import IntercomMessenger from '@/components/IntercomMessenger';
import { DynamicBackground } from '@/components/dynamic-background';
import { CookieConsent } from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument-serif" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-plus-jakarta-sans" });

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
      <body className={clsx(inter.className, roboto.className, instrumentSerif.variable, plusJakartaSans.variable, "antialiased")}>
        <ClerkProvider
          dynamic
          signInFallbackRedirectUrl="/base"
          signUpFallbackRedirectUrl="/base"
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
              socialButtonsBlockButton__google: 'hidden',
              socialButtonsIconButton__google: 'hidden',
            }
          }}
        >
          <DynamicBackground />
          {children}
          <CookieConsent />
          <IntercomMessenger />
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}
