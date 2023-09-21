type Params = {
  date: Date
}

export default function FormattedDate({ date }: Params) {
  return <time dateTime={date.toISOString()}>
    {
      date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  </time>
}
