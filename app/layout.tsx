import type { Metadata } from "next";
import { Inter, Noto_Music } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });
const notoMusic = Noto_Music({ weight:"400", subsets:["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${notoMusic.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
