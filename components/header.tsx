import Link from 'next/link'
import Container from "./container"
import { SITE_TITLE } from "@/lib/consts"

export default function Header() {
  return (
    <header
      className="border-t-8 border-t-neutral-600 border-b border-b-stone-200"
      role="banner"
    >
      <Container>
        <Link href="/" className="text-neutral-600 text-3xl leading-[3.5rem]">
          {SITE_TITLE}
        </Link>
        <nav className="float-right leading-[3.5rem]">
          <ul className="flex space-x-8 list-none">
            <li><Link className="text-neutral-600" href="/releases">Releases</Link></li>
            <li><Link className="text-neutral-600" href="/about">About</Link></li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
