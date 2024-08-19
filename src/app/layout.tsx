import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutProvider from "@/components/layoutProvider/LayoutProvider";
import Toast from "@/utils/toast";
import Provider from "@/utils/sessionProvider";

const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Nirvana",
  description: "Generated by Samarth Chouhan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Toast />
          <LayoutProvider>{children}</LayoutProvider>
        </Provider>
      </body>
    </html>
  );
}
