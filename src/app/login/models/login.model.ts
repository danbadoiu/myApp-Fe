export enum Role {
  DOCTOR = 'ROLE_DOCTOR',
  PATIENT = 'ROLE_PATIENT',
}
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: Role;
}
