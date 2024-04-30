export function getDate(ms: number | undefined) {
  if (!ms) return "__/__/_____"
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(ms * 1000))
}
