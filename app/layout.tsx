import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TodoProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs todo app",
  description: "todo application using api and crud operations"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={"https://img.icons8.com/?size=100&id=2dWs3xmooprD&format=png&color=18F07F"} />
      </head>
      <body className={inter.className}>
        <TodoProvider>
          {children}
        </TodoProvider>
        </body>
    </html>
  );
}