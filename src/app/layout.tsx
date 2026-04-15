import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Roboto } from "next/font/google";
import { AuthProvider } from '@/components/auth-provider';
import { Analytics } from "@vercel/analytics/react"
import IntercomMessenger from '@/components/IntercomMessenger';
import FirebaseProvider from '@/components/firebase-provider';
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Artificial General Intelligence",
  description: "QCX - Quality Computers Experience",
  openGraph: {
    title: "Artificial General Intelligence",
    description: "QCX - Quality Computers Experience",
    images: "/opengraph-image.jpg",
    url: "https://www.queue.cx",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={clsx(inter.className, roboto.className, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseProvider>
            <AuthProvider>
              {children}
              <IntercomMessenger />
              <Analytics />
            </AuthProvider>
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
