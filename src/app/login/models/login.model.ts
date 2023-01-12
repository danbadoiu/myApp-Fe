export enum Role {
  HR = 'ROLE_HR',
  TEAMLEAD = 'ROLE_TEAM_LEAD',
  EMPLOYEE = 'ROLE_EMPLOYEE',
}
export interface User {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  userDetails: {
    employeeId: string;
    username: string;
    team: string;
    role: Role;
  };
}
