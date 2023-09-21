import Link from "next/link"
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/consts"
import { github, twitter } from "@/lib/socials"
import Container from "./container"

const socials = [github, twitter]

export default function Footer() {
  return (
    <footer className="pt-8 border-t border-solid border-neutral-200 h-card">
      <Container>
        <h2 className="text-lg mb-4">{SITE_TITLE}</h2>

        <div className="text-sm text-neutral-400 grid grid-cols-3 leading-relaxed">
          <div>
            <ul>
              {
                socials.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="text-blue-500 visited:text-blue-800"
                      href={item.baseurl + item.username}
                    >
                      <svg className="inline-block pr-2 w-6 h-4 fill-neutral-400">
                        <use xlinkHref={"/social-icons.svg#" + item.id} />
                      </svg>
                      <span>{item.username}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div>{/*-- empty column --*/}</div>
          <div>
            <p>{SITE_DESCRIPTION}</p>
          </div>
        </div>
      </Container>
    </footer>

  )
}
