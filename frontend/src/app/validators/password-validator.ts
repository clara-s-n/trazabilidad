export function passwordValidator(value: string): boolean {
  if (!value) return false;
  return value.length >= 6 && /[a-zA-Z]/.test(value) && /\d/.test(value);
}
