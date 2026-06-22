/* Parse an INR display string like "₹1,20,000" into a number, and format back. */
export function parseINR(value: string): number {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
