import { IsEmail, IsNotEmpty } from 'class-validator';

export class updateUserDto {
@IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string
}   