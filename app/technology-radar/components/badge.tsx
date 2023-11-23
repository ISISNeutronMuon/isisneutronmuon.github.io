import Link from 'next/link';

// Produces an badge of a chosen colour
type Params = {
  title: string;
  colour: string;
  className?: string;
  href?: string;
};

export default async function Badge({ title, colour, className, href }: Params) {
  let badgeJSX = () => {
    return (<h2 className={`my-3 text-base text-center text-white max-w-[10rem] px-2
  py-1 border-0 border-solid rounded-2xl ${className || ""}`} style={{ backgroundColor: colour }}>
      {title.toUpperCase()}
    </h2>)
  }

  return href ? <Link href={href}>{badgeJSX()}</Link> : badgeJSX();
}
