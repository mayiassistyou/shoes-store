import Footer from "@/components/footer";
import Navbar from "@/components/navigation/navbar";
import { auth } from "@/server/auth";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Football Shoes Store",
  description: "The best football shoes store in the world",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto max-w-8xl flex-grow px-6 md:px-12">
            <Navbar />

            <main className="flex min-h-[calc(100vh-4rem)] flex-col">
              <div className="mb-20 mt-8 flex h-full flex-1 flex-col">
                {children}
              </div>
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
