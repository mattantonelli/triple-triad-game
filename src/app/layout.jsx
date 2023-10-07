import './globals.scss'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import localFont from 'next/font/local'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })
const xivFont = localFont({ src: '../../public/fonts/XIV_ASAS_R.otf' })

export const metadata = {
  title: 'Triple Triad',
  description: 'Play Triple Triad in your web browser.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${xivFont.className}`}>
        <div className="container-fluid">
          <header>
            <nav className="navbar navbar-expand">
              <div className="container">
                <Link href="/" className="navbar-brand">
                  <Image src="/images/logo.png" width="40" height="40" alt="Logo" />
                  <span>Triple Triad</span>
                </Link>
                <div className="collapse navbar-collapse">
                  <div className="navbar-nav">
                    <Link href="#" className="nav-link">Play</Link>
                    <Link href="#" className="nav-link">Decks</Link>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <main className="mt-3">{children}</main>
        </div>
      </body>
    </html>
  )
}
