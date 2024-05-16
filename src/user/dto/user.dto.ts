import { IsEmail } from 'class-validator';

export class CreateUserDto {}

export class FindUserByMailDto {
  @IsEmail()
  email: string;
}
