import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme";
import { dark } from "@clerk/themes";
import ReactQueryProvider from "@/providers/react-query";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opal",
  description: "Share AI Powered Videos with your friends.",
};

export default function RootLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${manrope.className} antialiased bg-[#171717]`}
          cz-shortcut-listen="true"
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
