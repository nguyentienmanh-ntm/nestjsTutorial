import { IsEmail, IsNotEmpty } from 'class-validator';

export class createUserDto {
@IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string
}