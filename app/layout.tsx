import './globals.css'
import type { Metadata } from 'next'
import Container from '@/components/container'
import Header from '@/components/header'
import Footer from '@/components/footer'

import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/consts'

export const metadata: Metadata = {
  generator: 'nextjs',
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
