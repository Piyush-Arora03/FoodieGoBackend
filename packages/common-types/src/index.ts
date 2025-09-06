export enum Role {
  CUSTOMER = 'CUSTOMER',
  RESTAURANT = 'RESTAURANT',
  RIDER = 'RIDER',
  ADMIN = 'ADMIN',
}

export interface JwtPayload {
  id: string;
  role: Role;
}