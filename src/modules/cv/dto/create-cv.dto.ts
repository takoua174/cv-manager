import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCvDto {
  @ApiProperty({ description: 'Full name of the CV owner', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: 'First name of the CV owner', example: 'John' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstname: string;

  @ApiProperty({ description: 'Age of the CV owner', example: 28 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(18)
  age: number;

  @ApiProperty({
    description: 'CIN (Citizen Identification Number)',
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  cin: number;

  @ApiProperty({
    description: 'Current job title',
    example: 'Software Engineer',
  })
  @IsNotEmpty()
  @IsString()
  job: string;

  @ApiProperty({ description: 'Path to CV file/image', required: false })
  @IsOptional()
  @IsString()
  path?: string;
}
