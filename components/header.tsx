import Link from 'next/link'
import Container from "./container"
import { SITE_TITLE } from "@/lib/consts"

const headerItems = [
  { title: "About", href: "/about" },
  { title: "Releases", href: "/releases" }
];

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
            {headerItems.map((item) => <li key={item.href} ><Link className="text-neutral-600" href={item.href}>{item.title}</Link></li>)}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
