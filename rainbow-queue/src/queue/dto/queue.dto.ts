import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsEmail, IsString, IsDate } from 'class-validator';

export class QueueDto {
  @IsNotEmpty()
  @IsInt()
  id: BigInteger;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role;
}
