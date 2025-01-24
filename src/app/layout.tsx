import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "QCX",
  description: "QCX - multi-agent intelligence platform for exploration and automation.",
  openGraph: {
    title: "QCX",
    description: "QCX - multi-agent intelligence platform for exploration and automation.",
    images: "/opengraph-image.png", // Relative path to the image
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
        <meta property="og:title" content="QCX" />
        <meta
          property="og:description"
          content="QCX - multi-agent intelligence platform for exploration and automation."
        />
        <meta
          property="og:image"
          content="/opengraph-image.png" // Relative path to the image
        />
        <meta property="og:url" content="https://www.queue.cx" />
        <meta property="og:type" content="website" />
      </head>
      <body className={clsx(inter.className, roboto.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
