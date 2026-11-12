import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Juliet Njambi Muthee & Alex Maina Mugo — Birthday",
  description: "A cinematic birthday story for Juliet Njambi Muthee and Alex Maina Mugo."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      {children}
    </body>
    </html>
  );
}
