export function pretifyDate(timestamp) {
  const date = new Date(timestamp)
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
}
