export default function Container({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container max-w-4xl mx-auto">
      {children}
    </div>

  )
}
