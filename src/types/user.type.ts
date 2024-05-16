import { User } from '@prisma/client';

export type IUserWithoutPassword = Omit<User, 'password'>;
