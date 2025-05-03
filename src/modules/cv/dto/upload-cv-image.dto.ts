import { IsNumber } from 'class-validator';

export class UploadCvImageDto {
  @IsNumber()
  cvId: number;
}