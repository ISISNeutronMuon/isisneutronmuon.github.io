import './globals.css'
import type { Metadata } from 'next'
import Container from '@/components/container'
import Header from '@/components/header'
import Footer from '@/components/footer'

import { siteTitle, siteDescription } from '@/lib/consts'

export const metadata: Metadata = {
  generator: 'nextjs',
  title: siteTitle,
  description: siteDescription,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="py-8" aria-label="Content">
          <Container>
            {children}
          </Container>
        </main>
        <Footer />
      </body>
    </html>
  )
}
