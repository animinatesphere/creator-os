import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* --- Fonts --- */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CreatorOS — All-in-One Creator Platform",
  description:
    "Build websites, design graphics, manage clients, and grow your business — all in one place. The ultimate platform for creators and freelancers.",
  keywords: [
    "website builder",
    "invoice maker",
    "graphic design",
    "portfolio",
    "creator platform",
    "link in bio",
    "resume builder",
  ],
  authors: [{ name: "CreatorOS" }],
  openGraph: {
    title: "CreatorOS — All-in-One Creator Platform",
    description: "Build, design, and grow — all in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
        style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
      >
        {children}
      </body>
    </html>
  );
}
