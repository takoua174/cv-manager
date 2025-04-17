import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user', example: 'johndoe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', example: 'StrongPassword123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
