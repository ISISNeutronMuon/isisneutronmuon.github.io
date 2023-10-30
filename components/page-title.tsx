// Provides a h1-level heading to a page with appropriate styling
type Params = {
  title: string;
};

export default function PageTitle({ title }: Params) {
  return (
    <header className="prose mb-4">
      <h1>{title}</h1>
    </header>
  )
}
