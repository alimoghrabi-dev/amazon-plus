import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AmazonPlus",
  description: "A Place which make your wallet cry.",
  icons: [
    {
      url: "/logo.png",
      sizes: "32x32",
      type: "image/png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <Navbar />
        <main className="p-4 max-w-7xl m-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
