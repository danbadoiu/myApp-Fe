export enum Role {
  DOCTOR = 'ROLE_DOCTOR',
  PATIENT = 'ROLE_PATIENT',
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
}
