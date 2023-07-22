import { Prisma, Role } from '.prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number;
  firstName: string;
  lastName: string;
  role?: Role;
  email: string;
  password: string;
  birthday: Date;
}
