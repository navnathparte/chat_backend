import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'anku@lover' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'anku@xyz.com' })
  email: string;
}
export class SaveUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'anku@xyz.com' })
  email: string;

  @IsOptional()
  @ApiProperty({ example: 'ankita' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'anku@lover' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'ankuu' })
  username: string;
}
