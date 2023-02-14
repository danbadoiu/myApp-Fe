export enum Role {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
  password: string;
  profilePicture: Blob;
}
