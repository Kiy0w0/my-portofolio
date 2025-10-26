import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const poppins = Poppins({ 
  weight: ["400", "600", "700"],
  subsets: ["latin"], 
  variable: "--font-display" 
});

export const metadata: Metadata = {
  title: "Mamagii | Comfy Corner",
  description: "Portfolio website with anime comfy theme for developers",
  icons: {
    icon: '/anya.ico',
    shortcut: '/anya.ico',
    apple: '/anya.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}

