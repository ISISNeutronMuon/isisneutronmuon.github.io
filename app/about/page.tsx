import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'About',
  description: 'Neutrons...',
}

export default function About() {
  return (
    <main><h1 className="text-neutral-600">About</h1></main>
  )
}
