export function rolesValidator(roles: string[] | number[]): boolean {
  // Solo válido si al menos un rol seleccionado
  return Array.isArray(roles) && roles.length > 0;
}