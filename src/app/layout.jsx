import "./globals.scss";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Triple Triad Online",
  description: "Play Triple Triad in your web browser.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} d-flex flex-column`}>
        <header>
          <nav className="navbar navbar-expand shadow">
            <div className="container">
              <Link href="/play" className="navbar-brand">
                <Image src="/images/logo.png" width="40" height="40" alt="Logo" />
                <span>Triple Triad Online</span>
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
        <footer className="footer mt-auto py-3">
          <div className="container text-center">
            <span>
              Created by Raelys |
              <a href="https://github.com/mattantonelli/triple-triad-game" target="_blank" className="m-1">
                <Image src="/images/github.png" alt="GitHub" width="25" height="25" />
              </a>
              <a href="https://discord.gg/RX8dz3sb7U" target="_blank">
                <Image src="/images/discord.png" alt="Discord" width="25" height="24" />
              </a>
            </span>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
