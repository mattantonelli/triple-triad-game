import "./globals.scss";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Triple Triad",
  description: "Play Triple Triad in your web browser.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav className="navbar navbar-expand shadow">
            <div className="container">
              <Link href="/play" className="navbar-brand">
                <Image src="/images/logo.png" width="40" height="40" alt="Logo" />
                <span>Triple Triad</span>
              </Link>
              <div className="collapse navbar-collapse">
                <div className="navbar-nav">
                  <Link href="/play" className="nav-link">Play</Link>
                  <Link href="/cards" className="nav-link">Cards</Link>
                  <Link href="/npcs" className="nav-link">NPCs</Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="container-fluid">
          <main className="mt-3">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
