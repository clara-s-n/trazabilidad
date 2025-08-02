export function emailValidator(value: string): boolean {
  if (!value) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}
