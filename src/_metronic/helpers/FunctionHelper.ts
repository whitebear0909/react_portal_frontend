export function capitalize(str: string | undefined | null) {
  if (!str) return
  str = str.toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1)
}
