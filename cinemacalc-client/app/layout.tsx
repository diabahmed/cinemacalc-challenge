import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { proximaNova } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cinema Calc Challenge",
  description: "Calculate film production expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          proximaNova.className,
          "antialiased max-w-full overflow-x-hidden"
        )}
        suppressHydrationWarning={true}
      >
        <Providers>
          <NextTopLoader />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
