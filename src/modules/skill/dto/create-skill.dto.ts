import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({
    description: 'Name/designation of the skill',
    example: 'JavaScript',
  })
  @IsNotEmpty()
  @IsString()
  designation: string;
}
