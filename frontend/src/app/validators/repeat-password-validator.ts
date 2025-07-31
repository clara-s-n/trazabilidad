export function repeatPasswordValidator(password: string, repeat: string): boolean {
  return password === repeat && !!repeat;
}
