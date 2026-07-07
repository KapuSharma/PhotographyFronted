/* Avatar fallback initials: the first letter of the first two words of a name,
   upper-cased. "aisha rohan" → "AR", "nupur" → "N", "" → "". Used wherever a
   person has no photo and we render a colored circle instead. */
export function initials(name?: string): string {
  return (name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
