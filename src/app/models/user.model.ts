export interface IUser {
  id: string;
  role: UserRole;
  fullName: string;
}

export enum UserRole {
  DEVELOPER = 'DEVELOPER',
  PM = 'PM',
  BA = 'BA'
}
