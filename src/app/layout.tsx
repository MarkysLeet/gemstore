import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Avenue Professional",
  description: "Professional Manicure Supplies & Equipment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-avenue-bg text-avenue-text`}
      >
        {children}
      </body>
    </html>
  );
}
