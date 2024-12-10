import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Nav from "./components/Nav/Nav";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "MSB - Site de Vagas",
  description: "Site de Vagas da MSB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased  bg-gray-50 pt-[60px] `}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
