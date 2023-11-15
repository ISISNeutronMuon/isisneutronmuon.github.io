// Provides consistent prose-based styling for heading elements
type Params = {
  level: number
  title: string;
};

const h = (level: number, content: string) => {
  switch (level) {
    case 1:
      return <h1>{content}</h1>
    case 2:
      return <h2>{content}</h2>
    case 3:
      return <h3>{content}</h3>
    case 4:
      return <h4>{content}</h4>
    case 5:
      return <h5>{content}</h5>
    case 6:
      return <h6>{content}</h6>
  }
}

export default function Heading({ level, title }: Params) {
  return (
    <header className="prose mb-4">
      {h(level, title)}
    </header >
  )
}
