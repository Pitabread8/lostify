import './globals.css'
import { Inter } from 'next/font/google'
import SessionProviderWrapper from "./components/SessionProviderWrapper";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lostify',
  description: 'Discover "forgotten" songs from the depths of Spotify\'s library!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
